const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');

const userRegister = require ('../model/model.js');
const { Model } = require('mongoose');

//Post Method
router.post('/register', async (req, res) => 
{
    bcrypt.hash(req.body.password, 10, async (err, hash) => 
    {
        if (err) 
        {
            return res.status(500).json 
            ({
                error: err
            })
        } else 
        {
            const result = await userRegister.findOne({username:req.body.username}).exec();
            if (result != null)
            {
                // User exists
                err = 'Username taken. Try again.';
                res.status(400).json({error:err});
            }
            const data = new userRegister
            ({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                password: hash
           })
            try 
            {
                const newUser = await data.save();
                console.log(newUser);
                res.status(200).json(newUser)
                res.status(201).json({ message: "User created successfully."})
            } catch(error) 
            {
                console.log(error);
                res.status(400).json({message: error.message})
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
    const username = req.body.username;
    var password = req.body.password;

    var id = -1;
    var fn = '';
    var ln = '';
    var error = 'Login unsuccessful.';

    const result = await userRegister.findOne({username:username}).exec();

    if (result != null)
    {
        if (bcrypt.compare(password, result.password))
        {
            id = result._id;
            fn = result.first_name;
            ln = result.last_name;
            error = '';
            var ret = { _id:id, first_name:fn, last_name:ln, error:error};
            res.status(200).json(ret);
        }
        else
        {
            error = "Passwords do not match.";
            res.status(400).json({ _id:id, first_name:fn, last_name:ln, error:error});
        }
    }
    else
    {
        error = 'User not found.';
        res.status(400).json({ _id:id, first_name:fn, last_name:ln, error:error});
    }
})

module.exports = router;