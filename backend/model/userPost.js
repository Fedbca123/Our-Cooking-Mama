const mongoose = require('mongoose');

const userPostSchema = new mongoose.Schema 
({
    Category: String,
    Photo: String,              // waiting on database update
    Caption: String,
    Tags: Array,
    ProfileID: String,
    RecipeID: String
 },
 {
    collection: 'UserPost'      // waiting on database update
 }
);

module.exports = mongoose.model('UserPost', userPostSchema);