const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema 
({
    NickName: String,
    DietRest: [String],
    FavCuisine: [String],
    FavDrink: [String],
    FavFood: [String],
    FavoriteFlavor: [String],
    FoodAllerg: [String],
    AccountType: Boolean,
    PersonalFeedID: String,
    MostRecentPosts: [String]
 },
 {
    collection: 'UserInfo'
 }
);

module.exports = mongoose.model('UserInfo', userProfileSchema);