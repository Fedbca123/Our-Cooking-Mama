const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');

const userRegister = require ('../model/userAccount.js');
const { Model } = require('mongoose');

//Post Method
router.post('/register', async (req, res) => 
{
    bcrypt.hash(req.body.Password, 10, async (err, hash) => 
    {
        if (err) 
        {
            return res.status(500).json 
            ({
                error: err
            })
        } else 
        {
            const result = await userRegister.findOne({UserName:req.body.UserName}).exec();
            if (result != null)
            {
                // User exists
                err = 'Username taken. Try again.';
                res.status(400).json({error:err});
            } else {
                const data = new userRegister
                ({
                    FirstName: req.body.FirstName,
                    LastName: req.body.LastName,
                    UserName: req.body.UserName,
                    Email: req.body.Email,
                    Password: hash
               })
                try 
                {
                    const newUser = await data.save();
                    console.log(newUser);
                    res.status(200).json(newUser)
                } catch(error) 
                {
                    console.log(error);
                }
            }            
        }
    })
})

//Get all Method
router.get('/getAll', async (req, res) => 
{
    try 
    {
        const data = await userRegister.find();
        res.json(data) 
    } catch (error) 
    {
        res.status(500).json({message: error.message})
    }
})

// Login 
router.post('/login', async (req, res, next) => 
{
    const username = req.body.UserName;
    var password = req.body.Password;

    var id = -1;
    var fn = '';
    var ln = '';
    var error = 'Login unsuccessful.';

    const result = await userRegister.findOne({UserName:username}).exec();

    if (result != null)
    {
        var isEqual = await bcrypt.compare(password, result.Password);
        if (isEqual)
        {
            id = result._id;
            fn = result.FirstName;
            ln = result.LastName;
            error = '';
            var ret = { _id:id, FirstName:fn, LastName:ln, error:error};
            res.status(200).json(ret);
        }
        else
        {
            error = "Passwords do not match.";
            res.status(400).json({ _id:id, FirstName:fn, LastName:ln, error:error});
        }
    }
    else
    {
        error = 'User not found.';
        res.status(400).json({ _id:id, FirstName:fn, LastName:ln, error:error});
    }
})

router.post('/searchProfiles', async (req, res, next) =>
{
    const query = req.body.Query;

    const result = await userRegister.find({UserName: {$regex: query, $options: 'i'}}).exec();
    
    if (result != null)
    {
        res.status(200).json(result);
    }
    else
    {
        res.status(400).json({error:"No results found."});
    }
})

module.exports = router;