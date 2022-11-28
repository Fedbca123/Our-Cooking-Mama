const mongoose = require('mongoose');

const followingSchema = new mongoose.Schema 
({
    Followers: [String],
    ProfileID: String
 },
 {
    collection: 'Followers'
 }
);

module.exports = mongoose.model('Followers', followingSchema);