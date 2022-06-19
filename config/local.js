const passport = require('passport');
const localstrategy = require('passport-local').Strategy;
const user = require('../models/user1');

module.exports = function(){
    console.log('===> localstrategy function')
    passport.use(new localstrategy(authLocal));
};

function authLocal(user_name, password, done){
    console.log('===> authLocal function');
    user.findOne({user_name : user_name},(err,user)=>{
        if(err)
        {
            return done(err);
        }
        if(!user)
        {
            return done(null , false , {message:'Invalid User'});
        }
        if(!user.authenticate(password))
        {
            return done(null , fasle , {message:'Invalid password'});
        }

        return done(null , user);
    });
}