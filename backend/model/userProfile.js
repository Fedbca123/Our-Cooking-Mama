const mongoose = require('mongoose');
const userId = UserAccountSchema.Schema.Types.ObjectId;

const userProfileSchema = new mongoose.Schema 
({
    NickName: String,
    DietRest: Array,
    FavCuisine: Array,
    FavDrink: Array,
    FavFood: Array,
    FavoriteFlavor: Array,
    FoodAllerg: Array,
    UserID: userId,
    AccountType: Boolean,
    PersonalFeedID: String,
    Pronouns: String
 },
 {
    collection: 'UserInfo'
 }
);

module.exports = mongoose.model('UserInfo', userProfileSchema);