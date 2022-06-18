let mongoose = require('mongoose');

//model class
let userModel = mongoose.Schema(
    {
        Email_id : {
            type : String,
            match : [/.+\@.+\..+/,"Invalid Email address. Please add  a valid email address"]

        },
        user_name : String,
        contact : String

    },
    {
        collection : "Users"
    }
);

module.exports = mongoose.model('Users',userModel);