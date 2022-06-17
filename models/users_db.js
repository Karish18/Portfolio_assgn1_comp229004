let mongoose = require('mongoose');

//model class
let userModel = mongoose.Schema(
    {
        Email_id : String,
        user_name : String,
        contact : String

    },
    {
        collection : "Users"
    }
);

module.exports = mongoose.model('Users',userModel);