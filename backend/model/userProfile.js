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
    UserID: {type: mongoose.Schema.Types.ObjectId, ref: 'userReg'},
    AccountType: Boolean,
    PersonalFeedID: String,
    Pronouns: String
 },
 {
    collection: 'UserInfo'
 }
);

module.exports = mongoose.model('UserInfo', userProfileSchema);