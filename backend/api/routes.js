const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');

const userRegister = require ('../model/userAccount.js');
const userProfile = require ('../model/userProfile.js');
const userPost = require ('../model/userPost.js');
const userComment = require ('../model/userComment.js');
const recipe = require ('../model/recipes.js');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const { ObjectID, ObjectId } = require('bson');

// For frontend CORS
router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3002"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // change the 3001 port the port where your webapp is running from!!
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

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

// Get all Method (Register / User Accounts)
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

// Get Specific User Profile
router.post('/getOneProfile', async (req, res) => {
    try {
        const query = req.body.Query;
        const result = await userProfile.findOne({UserID: {$regex: query}}).exec();
        if (result != null) {
            res.status(200).json(result);
        } else {
            res.status(400).json({error:"User profile not found."});
        }
    } catch (error) {
        console.log(error);
    }
})

// Login 
router.post('/login', async (req, res, next) => 
{
    const username = req.body.UserName;
    var Password = req.body.Password;

    var id = -1;
    var fn = '';
    var ln = '';
    var error = 'Login unsuccessful.';

    const result = await userRegister.findOne({UserName:username}).exec();

    if (result != "")
    {
        var isEqual = await bcrypt.compare(Password, result.Password);
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
                Pronouns: req.body.pronouns,
                ProfilePhoto: req.body.ProfilePhoto
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

// Search for profiles only
router.post('/searchProfiles', async (req, res, next) =>
{
    const query = req.body.Query;

    const result = await userRegister.find({UserName: {$regex: query, $options: 'i'}}).exec();
    
    if (result != "")
    {
        res.status(200).json(result);
    }
    else
    {
        res.status(400).json({error:"No results found."});
    }
})

// Search for profiles, recipes, and posts.
router.post('/universalSearch', async (req, res, next) =>
{
    const query = req.body.Query;

    const userSearch = await userRegister.find({UserName: {$regex: query, $options: 'i'}}).exec();
    const postSearch = await userPost.find({Tags: {$regex: query, $options: 'i'}}).exec();
    const recipeSearch = await recipe.find({Recipe: {$regex: query, $options: 'i'}}).exec();

    if (userSearch == "" && postSearch == "" && recipeSearch == "")
    {
        res.status(400).json({error:"No results found."});
    }
    else
    {
        res.status(200).json({Users: userSearch, Posts: postSearch, Recipes: recipeSearch});
    }
})

// Add recipe
router.post('/addRecipe', async (req, res) => 
{
    const result = await recipe.findOne({Recipe:req.body.Name}).exec();

    if (result != "")
    {
        err = 'Recipe already exists.';
        res.status(400).json({error:err});
    } 
    else 
    {
        const data = new recipe
        ({
            Ingredients: req.body.Ingredients,
            Recipe: req.body.Name,
            DatePosted: new Date(),
            ChefID: req.body.ChefID
        })
        try 
        {
            const newRecipe = await data.save();
            console.log(newRecipe);
            res.status(200).json(newRecipe)
        } catch(error) 
        {
            console.log(error);
        }
    } 
})

// Edit recipes
router.post('/editRecipe', async (req, res) => 
{
    const recipeId = req.body.RecipeID;
    try {
        const result = await recipe.findOne({ _id: recipeId }).exec();
    
        // check if id is valid
        if (result == "") {
            var ret = {RecipeID: -1, error: "Recipe Not Found."}
            return res.json(ret);
        } else {
            // edit recipe
            console.log('Recipe found. Please edit.')
            const editedRecipe = {
                Ingredients: req.body.Ingredients,
                Recipe: req.body.Name,
                DatePosted: result.DatePosted,
                ChefID: result.ChefID
            }

            const updatedRecipe = await recipe.findByIdAndUpdate(recipeId, editedRecipe, {
                new: true,
            });
            console.log(updatedRecipe);
            res.status(200).json(updatedRecipe)
        }
    }
    catch(error) 
    {
        res.status(400).json({error:error.message});
    }
})

// Delete recipe
router.post('/deleteRecipe', async (req, res) => 
{
    try 
    {
        const recipeID = await recipe.findByIdAndDelete(req.body.RecipeID).exec();
        res.status(200).json(recipeID);
    } 
    catch (error)
    {
        res.status(400).json({error:"Recipe does not exist."});
    }
})

// Get personal feed
router.post('/getPersonalFeed', async (req, res) =>
{
    const userID = req.body.UserID;

    try
    {
        const result = await userPost.find({ProfileID: userID}).sort({_id: -1}).exec();

        if (result != "")
        {
            res.status(200).json(result);
        }
        else
        {
            res.status(400).json({error:"No posts found."});
        }
    }
    catch (err)
    {
        res.status(400).json({error:err.message});
    }
})

// Add a comment to a post
router.post('/addComment', async (req, res) => 
{
    const data = new userComment
    ({
        Message: req.body.Message,
        DatePosted: new Date(),
        CommenterID: req.body.CommenterID,
        PostID: req.body.PostID
    })
    try 
    {
        const newComment = await data.save();
        console.log(newComment);
        res.status(200).json(newComment)
    } 
    catch(error) 
    {
        console.log(error);
    }

})

// Edit a comment
router.post('/editComment', async (req, res) => 
{
    const commentID = req.body.CommentID;

    try {
        const result = await userComment.findOne({ _id: commentID }).exec();

        // check if id is valid
        if (result == "") {
            var ret = {CommentID: -1, error: "Comment Not Found."}
            return res.status(400).json(ret);
        } 
        else 
        {
            console.log(result.PostID);
            // edit comment
            console.log('Comment found. Please edit.')
            const editedComment = {
                Message: req.body.Message,
                DatePosted: result.DatePosted,
                CommenterID: result.CommenterID,
                PostID: result.PostID
            }

            const updatedComment = await userComment.findByIdAndUpdate(commentID, editedComment, {
                new: true
            });
            console.log(updatedComment);
            res.status(200).json(updatedComment)
        }
    } 
    catch(error) 
    {
        res.status(400).json({error:error.message});
    }
})

// Get all comments on a post
router.post('/getPostComments', async (req, res) =>
{
    const postID = req.body.PostID;

    try
    {
        const result = await userComment.find({PostID: postID}).sort({_id: -1}).exec();

        if (result != "")
        {
            res.status(200).json(result);
        }
        else
        {
            res.status(400).json({error:"No comments found."});
        }
    }
    catch (err)
    {
        res.status(400).json({error:err.message});
    }
})

module.exports = router;
