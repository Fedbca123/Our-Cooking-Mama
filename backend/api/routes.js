const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');

const userRegister = require ('../model/userAccount.js');
const { Model } = require('mongoose');

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

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

// create/edit Profile
router.post('/editProfile', async (req, res) => {
    const result = await userProfile.findOne({ UserName: username }).exec();
    const feed = "feedID";
    let user = getCookie("id");
    try {
        // check if id is valid
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            var ret = {userId: -1, error: "User Account Not Found."}
            return res.json(ret);
        } else {
            // check if profile exists already
            if (result) {
                // edit profile
                console.log('User profile found. Please edit.')
                const profile = new userProfile ({
                    NickName: req.body.NickName,
                    DietRest: req.body.DietRest,
                    FavCuisine: req.body.FavCuisine,
                    FavDrink: req.body.FavDrink,
                    FavFood: req.body.FavFood,
                    FavoriteFlavor: req.body.FavoriteFlavor,
                    FoodAllerg: req.body.FoodAllerg,
                    UserID: result._id,
                    AccountType: req.body.AccountType,
                    PersonalFeedID: feed,
                    Pronouns: req.body.pronouns 
                })

            } else if (!result) {
                // create profile
                console.log('User profile not found. Please create one.')
                
            }
        } 
    } catch {
        // Profile creation/update error
        error = "Cannot find user account.";
        res.status(400).json({ _id:id, FirstName:fn, LastName:ln, error:error});
    }
})

router.post('/searchProfiles', async (req, res, next) =>
{
    const query = '/' + req.body.Query + '/i';
    console.log(query);

    const result = await userRegister.find({UserName:query}, (err, result) =>
    {
        if (err)
        {
            res.status(400).json({Error:err});
        }
        else
        {
            res.status(200).json(JSON.stringify(result));
        }
    });
})

module.exports = router;