const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary');
const multer = require('multer');

const userRegister = require ('../model/userAccount.js');
const userProfile = require ('../model/userProfile.js');
const userPost = require ('../model/userPost.js');
const pf = require ('../model/personalFeed.js');
const recipe = require ('../model/recipes.js');
const mongoose = require('mongoose');
const { json } = require('body-parser');

// For frontend CORS
router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3002"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // change the 3001 port the port where your webapp is running from!!
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// Cloudinary Config for Image Upload
cloudinary.config ({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_ACCESS_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_ACCESS_KEY,
});

// Define where the photo will be stored
var storage = multer.diskStorage ({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Only image files are accepted!'), false);
    }
    cb(null, true);
  };

var upload = multer({ storage: storage, fileFilter: imageFilter });

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
router.post('/login', async (req, res) => 
{
    const username = req.body.UserName;
    var Password = req.body.Password;

    var id = -1;
    var fn = '';
    var ln = '';
    var error = 'Login unsuccessful.';

    const result = await userRegister.findOne({UserName:username}).exec();

    if (result != null)
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
router.post('/editProfile', upload.single('file'), async (req, res) => {

    var feed = await pf.findOne({ProfileID: req.body.userId}).exec();
    console.log("Feed is " + feedID);
    if (feed == null)
    {
        const feed = new pf ({
            Photos: [],
            ProfileID: req.body.userId,
        });

        const result = await feed.save();
        console.log(result);
        var feedID = result._id;
    }
    else 
        var feedID = feed._id;

    try {
        // If file is provided
        if (req.file != null) {
            // Getting this userId from cookie on frontend, verbatim 'userId'
            cloudinary.v2.uploader.upload(req.file.path, async (err, result) => {
                if (err) {
                    req.json(err.message);
                }
                const userId = req.body.userId;
                const validAccount = await userRegister.findOne({ _id: userId }).exec();
                try {
                    // check if id is valid
                    if (validAccount == null) {
                        var ret = {userId: -1, error: "User Account Not Found."}
                        return res.json(ret);
                    } else {
                        // edit profile
                        console.log('User profile found. Please edit.')
                        var profile = {
                            NickName: req.body.NickName,
                            DietRest: req.body.DietRest,
                            FavCuisine: req.body.FavCuisine,
                            FavDrink: req.body.FavDrink,
                            FavFood: req.body.FavFood,
                            FavoriteFlavor: req.body.FavoriteFlavor,
                            FoodAllerg: req.body.FoodAllerg,
                            UserID: mongoose.Types.ObjectId(userId),
                            AccountType: req.body.AccountType,
                            PersonalFeedID: feedID,
                            Pronouns: req.body.pronouns,
                            ProfilePhoto: result.secure_url
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
        } 
        // File not provided
        else {
            const userId = req.body.userId;
            const validAccount = await userRegister.findOne({ _id: userId }).exec();
            try {
                // check if id is valid
                if (validAccount == null) {
                    var ret = {userId: -1, error: "User Account Not Found."}
                    return res.json(ret);
                } else {
                    // edit profile
                    console.log('User profile found. Please edit. (no file)');
                    const prof = await userProfile.findOne({UserID: userId}).exec();
                    console.log(prof);
                    if (prof != null) {
                        var profile = {
                            NickName: req.body.NickName,
                            DietRest: req.body.DietRest,
                            FavCuisine: req.body.FavCuisine,
                            FavDrink: req.body.FavDrink,
                            FavFood: req.body.FavFood,
                            FavoriteFlavor: req.body.FavoriteFlavor,
                            FoodAllerg: req.body.FoodAllerg,
                            UserID: mongoose.Types.ObjectId(userId),
                            AccountType: req.body.AccountType,
                            PersonalFeedID: feedID,
                            Pronouns: req.body.pronouns,
                            ProfilePhoto: prof.ProfilePhoto
                        }
                    }
                    else {
                        console.log("Here");
                        var profile = {
                            NickName: req.body.NickName,
                            DietRest: req.body.DietRest,
                            FavCuisine: req.body.FavCuisine,
                            FavDrink: req.body.FavDrink,
                            FavFood: req.body.FavFood,
                            FavoriteFlavor: req.body.FavoriteFlavor,
                            FoodAllerg: req.body.FoodAllerg,
                            UserID: mongoose.Types.ObjectId(userId),
                            AccountType: req.body.AccountType,
                            PersonalFeedID: feedID,
                            Pronouns: req.body.pronouns,
                            ProfilePhoto: ""
                        }
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
router.post('/editPost', upload.single('file'), function (req, res) {
    try {
        cloudinary.v2.uploader.upload(req.file.path, async (err, result) => {
            const recipeId = req.body.RecipeID;
            const postId = req.body.PostID;
            const profileId = req.body.ProfileID;
            const validRecipe = await userPost.findOne({ RecipeID: recipeId }).exec();
            const validPost = await userPost.findOne({ _id: postId }).exec();
            // check if id is valid
            if (validPost == null) {
                var ret = {postId: -1, error: "User Post Not Found."}
                return res.json(ret);
            }
            if (validRecipe == null) {
                if (err) {
                    res.json(err.message);
                }
                const post = {
                    Category: req.body.Category,
                    Photo: result.secure_url,            
                    Caption: req.body.Caption,
                    Tags: req.body.Tags,
                    ProfileID: profileId,
                    
                }
                const updatedPost = await userPost.findByIdAndUpdate(postId, post, {
                    new: true,
                });
                console.log(updatedPost);
                res.status(200).json(updatedPost)
            } else {
                const post = {
                    Category: req.body.Category,
                    Photo: result.secure_url,            
                    Caption: req.body.Caption,
                    Tags: req.body.Tags,
                    ProfileID: profileId,
                    RecipeID: recipeId
                }
                const updatedPost = await userPost.findByIdAndUpdate(postId, post, {
                    new: true,
                });
                console.log(updatedPost);
                res.status(200).json(updatedPost)
            }
        })
    } catch(error) {
        console.log(error);
    }
})

// add Post
router.post('/addPost', upload.single('file'), function (req, res) {
    try {
        cloudinary.v2.uploader.upload(req.file.path, async (err, result) => {
            const recipeId = req.body.RecipeID;
            const userId = req.body.UserID;
            const validRecipe = await recipe.findOne({ _id: recipeId }).exec();
            const validAccount = await userRegister.findOne({ _id: userId }).exec();
            // check if id is valid
            if (validAccount == null) {
                var ret = {userId: -1, error: "User Account Not Found."}
                return res.json(ret);
            }
            if (validRecipe == null) {
                if (err) {
                    res.json(err.message);
                }
                var post = new userPost ({
                    Category: req.body.Category,
                    Photo: result.secure_url,
                    Caption: req.body.Caption,
                    Tags: req.body.Tags,
                    ProfileID: mongoose.Types.ObjectId(userId)
                })
                try {
                    const newPost = await post.save();
                    pf.updateOne({ProfileID: userId}, {$push: {Photos: newPost._id}});
                    console.log(newPost);
                    res.status(200).json(newPost)
                } catch(error) {
                    console.log(error);
                }
            } else {
                if (err) {
                    req.json(err.message);
                }
                var post = new userPost ({
                    Category: req.body.Category,
                    Photo: result.secure_url,
                    Caption: req.body.Caption,
                    Tags: req.body.Tags,
                    ProfileID: mongoose.Types.ObjectId(userId),
                    RecipeID: mongoose.Types.ObjectId(recipeId)
                })
                try {
                    const newPost = await post.save();
                    pf.updateOne({ProfileID: userId}, {$push: {Photos: newPost._id}});
                    console.log(newPost);
                    res.status(200).json(newPost)
                } catch(error) {
                    console.log(error);
                }
            }    
        })
    } catch(error) {
        console.log(error);
    }
})

// delete a Post
router.post('/deletePost', async (req, res) => {
    const postId = req.body.PostID;
    const profileId = req.body.ProfileID;
    console.log(postId);
    console.log(profileId);
    // Checks if id string is valid
    if(!mongoose.Types.ObjectId.isValid(postId)) {
        var ret = {id: -1, error: "Can't find instructions"}
        return res.json(ret);
      }
    try {
        const findingPost = await userPost.findById(postId);
        if (!findingPost) {
            var ret = {error: "Can't find post"}
            return res.json(ret);
        } else {
            console.log(findingPost.ProfileID);
            // Delete post if findingPost's profileId matches the taken in profileId
            if (findingPost.ProfileID == profileId) {
                userPost.findById(postId).deleteOne().exec();
                pf.updateOne({ProfileID: userId}, {$pull: {Photos: postId}});
                var ret = {id: 1, error: 'Post deleted!'}
                return res.json(ret);
            } else {
                var ret = {id: -1, error: "You cannot delete this post! UserIDs do not match!"}
                return res.json(ret);
            }
        }

    } catch (error) {
    	console.log(error);
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

    if (result != null)
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
router.post('/editRecipe', async (req, res) => {
    const recipeId = req.body.RecipeID;
    const result = await recipe.findOne({ _id: recipeId }).exec();
    try {
        // check if id is valid
        if (result == null) {
            var ret = {RecipeID: -1, error: "Recipe Not Found."}
            return res.json(ret);
        } else {
            // edit recipe
            console.log('Recipe found. Please edit.')
            const editedRecipe = {
                Ingredients: req.body.Ingredients,
                Recipe: req.body.Name,
                DatePosted: result.DatePosted,
                ChefID: req.body.ChefID
            }

            const updatedRecipe = await recipe.findByIdAndUpdate(recipeId, editedRecipe, {
                new: true,
                upsert: true,
            });
            console.log(updatedRecipe);
            res.status(200).json(updatedRecipe)
        }
    } catch(error) {
        console.log(error);
    }
})

// Delete recipe
router.post('/deleteRecipe', async (req, res) => {
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

module.exports = router;
