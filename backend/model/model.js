const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema ({
    //_id: mongoose.Schema.Types.ObjectId,
    first_name: String,
    last_name: String,
    username: String,
    email: String,
    hash: String 
})

module.exports = mongoose.model('user', userAccountSchema);