const mongoose = require('mongoose');

const followingSchema = new mongoose.Schema 
({
    Following: [String],
    ProfileID: String
 },
 {
    collection: 'Following'
 }
);

module.exports = mongoose.model('Following', followingSchema);