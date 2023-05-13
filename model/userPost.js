const mongoose = require('mongoose');

const userPostSchema = new mongoose.Schema 
({
    Category: String,
    Photo: String,            
    Caption: String,
    Tags: [String],
    ProfileID: String,
    RecipeID: {type: String, ref: 'Recipes'}
 },
 {
    collection: 'UserPost'      
 }
);

module.exports = mongoose.model('UserPost', userPostSchema);