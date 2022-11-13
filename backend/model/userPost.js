const mongoose = require('mongoose');

const userPostSchema = new mongoose.Schema 
({
    Category: String,
    Photo: String,            
    Caption: String,
    Tags: [String],
    ProfileID: String,
    RecipeID: String
 },
 {
    collection: 'UserPost'      
 }
);

module.exports = mongoose.model('UserPost', userPostSchema);