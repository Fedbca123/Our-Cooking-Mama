const mongoose = require('mongoose');
const userProfileSchema = new mongoose.Schema 
({
    NickName: String,
    DietRest: Array,
    FavCuisine: Array,
    FavDrink: Array,
    FavFood: Array,
    FavoriteFlavor: Array,
    FoodAllerg: Array,
    UserID: {type: String, ref: 'userReg'},
    AccountType: String,
    PersonalFeedID: String,
    Pronouns: String,
    ProfilePhoto: String
 },
 {
    collection: 'UserInfo'
 }
);

module.exports = mongoose.model('UserInfo', userProfileSchema);