const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema 
({
    FirstName: String,
    LastName: String,
    UserName: String,
    Email: String,
    Password: String,
    Verified: Boolean
 },
 {
    collection: 'UserReg'
 }
);

module.exports = mongoose.model('UserReg', userAccountSchema);