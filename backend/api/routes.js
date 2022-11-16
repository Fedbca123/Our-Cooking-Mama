const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');

const userRegister = require ('../model/userAccount.js');
const userProfile = require ('../model/userProfile.js');
const userPost = require('../model/userPost.js');
const mongoose = require('mongoose');

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
router.post('/login', async (req, res) => 
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
    // TO DO: Replace feed variable with _id from Personal Feed once created
    const feed = "feedID";
    // Getting this userId from cookie on frontend, verbatim 'userId'
    const userId = req.body.userId;
    const result = await userRegister.findOne({ _id: userId }).exec();
    try {
        // check if id is valid
        if (result == null) {
            var ret = {userId: -1, error: "User Account Not Found."}
            return res.json(ret);
        } else {
            // edit profile
            console.log('User profile found. Please edit.')
            const profile = {
                NickName: req.body.NickName,
                DietRest: req.body.DietRest,
                FavCuisine: req.body.FavCuisine,
                FavDrink: req.body.FavDrink,
                FavFood: req.body.FavFood,
                FavoriteFlavor: req.body.FavoriteFlavor,
                FoodAllerg: req.body.FoodAllerg,
                UserID: mongoose.Types.ObjectId(userId),
                AccountType: req.body.AccountType,
                PersonalFeedID: feed,
                Pronouns: req.body.pronouns 
            }
            try {
                const updatedProfile = await userProfile.findByIdAndUpdate(userId, profile, {
                    new: true,
                    upsert: true,
                });
                console.log(updatedProfile);
                res.status(200).json(updatedProfile)
            } catch(error) {
                // Profile creation/update error
                console.log(error);
                error = "Cannot find user account.";
                res.status(400).json(error);
            }
        }
    } catch(error) {
        console.log(error);
    }
})

// Search profiles
router.post('/searchProfiles', async (req, res) =>
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

// search Post
router.post('/searchPosts', async (req, res) =>
{
    try
    {
        const query = req.body.Query;

        const result = await userPost.find({Tags: {$regex: query, $options: 'i'}}).exec();
        
        if (result != null)
        {
            res.status(200).json(result);
        }
        else
        {
            res.status(400).json({error:"No results found."});
        }
    }
    catch (err)
    {
        res.status(500).json({error:err});
    }
})

// edit a Post
router.post('/editPost', async (req, res) =>
{
    try {
        const postId = req.body.PostID;
        const recipeId = req.body.RecipeID;
        const profileId = req.body.ProfileID;
        const post = {
            Category: req.body.Category,
            Photo: req.body.Photo,            
            Caption: req.body.Caption,
            Tags: req.body.Tags,
            ProfileID: profileId,
            RecipeID: recipeId
        }

        const updatedPost = await userPost.findByIdAndUpdate(postId, post, {
            new: true,
            upsert: true,
        });
        console.log(updatedPost);
        res.status(200).json(updatedPost)
    }
    catch(error) {
        console.log(error);
    }
})

// add Post
router.post('/addPost', async (req, res) => {
    try {
        const userId = req.body.userId;
        const recipeId = req.body.recipeId;
        const post = new userPost ({
            Category: req.body.Category,
            Photo: req.body.Photo,
            Caption: req.body.Caption,
            Tags: req.body.Tags,
            ProfileID: mongoose.Types.ObjectId(userId),
            RecipeID: mongoose.Types.ObjectId(recipeId)
        })
        try {
            const newPost = await post.save();
            console.log(newPost);
            res.status(200).json(newPost)
        } catch(error) {
            console.log(error);
        }
    } catch(error) {
        console.log(error);
    }
})

// delete a Post
router.post('/deletePost/:id', (req, res) => {
    try {
        userPost.findByIdAndDelete(req.params.id)
            .then((post) => {
                if (!post) {
                    return res.status(404).send();
                } else {
                    res.send(post);
                }
            })
            .catch((error) => {
                res.status(500).send(error);
            })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;