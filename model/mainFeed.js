const mongoose = require('mongoose');

const mainFeedSchema = new mongoose.Schema 
({
    FollowingID: String,
    ProfileID: String
 },
 {
    collection: 'MainFeed'
 }
);

module.exports = mongoose.model('MainFeed', mainFeedSchema);