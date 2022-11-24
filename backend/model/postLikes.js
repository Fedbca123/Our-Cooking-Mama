const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema 
({
    LikersID: String,
    DateLiked: Date,
    PostID: String
 },
 {
    collection: 'Likes'
 }
);

module.exports = mongoose.model('Likes', likesSchema);