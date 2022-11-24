const mongoose = require("mongoose");

const personalFeedSchema = new mongoose.Schema(
	{
		Photos: [String],
		ProfileID: String,
	},
	{
		collection: "PersonalFeed",
	},
);

module.exports = mongoose.model("PersonalFeed", personalFeedSchema);
