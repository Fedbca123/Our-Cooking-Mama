const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema 
({
    Ingredients: [String],
    Recipe: String,
    DatePosted: Date,
    ChefID: String,
 },
 {
    collection: 'Recipes'
 }
);

module.exports = mongoose.model('Recipes', recipeSchema);