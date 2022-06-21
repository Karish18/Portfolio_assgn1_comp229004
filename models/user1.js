let mongoose = require('mongoose');
let crypto = require('crypto');

//model class
let user_Model = mongoose.Schema(
    {
        salt : String,
        firstName : String,
        lastName : String,
        email: {
            type : String,
            match : [/.+\@.+\..+/,"Invalid Email address. Please add  a valid email address"]

        },
        // user_name : String,
        // contact : String,
        username : {
           type : String,
            unique : true,
            required : "This field is mandatory. Please enter a valid username",
            trim : true
        },   
        password : {
            type : String,
            validate : [(password) =>{return password && password.length>6;},
            "Incorrect password. Please enter password with length more than 6 letters "]
        },
        created:{
            type : Date,
            default :Date.now
        }
    },
    {
        collection : "Users1"
    }
        
);

//creating virtual attribute
user_Model.virtual('fullname')
.get(function(){
    return this.firstName + '' + this.lastName;
})
.set(function(fullname){
    let splitname = fullname.split('');
    this.firstName = splitname[0] || '';
    this.lastName = splitname[1] || '';
});

//middleware to run before saving
user_Model.pre('save' , function(next)
{
    if(this.password){
        this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'),'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

//middleware to run after save i.e while adding and editing user
user_Model.post('save' , function(next)
{
    console.log('Detials for "'+this.user_name +'" are saved.');
});

//hashPassword method
user_Model.methods.hashPassword = function(password)
{
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64,'sha512').toString('base64');
};

//authenticate method
user_Model.methods.authenticate = function(password)
{
    return this.password === this.hashPassword(password);
};

module.exports = mongoose.model('Users1',user_Model);