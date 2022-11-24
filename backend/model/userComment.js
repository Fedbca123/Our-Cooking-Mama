const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema 
({
    Message: String,
    DatePosted: Date,
    CommenterID: String,
    PostID: String
 },
 {
    collection: 'Comments'
 }
);

module.exports = mongoose.model('Comments', commentSchema);