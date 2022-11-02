const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema ({
    first_name: String,
    last_name: String,
    username: String,
    email: String,
    password: String 
})

module.exports = mongoose.model('UserReg', userAccountSchema);