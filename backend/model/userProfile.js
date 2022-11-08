const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
	{
		NickName: String,
		DietRest: Array,
		FavCuisine: Array,
		FavDrink: Array,
		FavFood: Array,
		FavoriteFlavor: Array,
		FoodAllerg: Array,
		AccountType: Boolean,
		PersonalFeedID: String,
		MostRecentPosts: Array,
	},
	{
		collection: "UserInfo",
	},
);

module.exports = mongoose.model("UserInfo", userProfileSchema);
