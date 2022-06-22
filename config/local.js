const passport = require('passport');
const localstrategy = require('passport-local').Strategy;
const user = require('../models/user1');

module.exports = function(){
   // console.log('===> localstrategy function')
    passport.use(new localstrategy((user_name, password, done)=>{
        //console.log('===> authLocal function');
        user.findOne({username : user_name},(err,user)=>{
            if(err)
            {
                return done(err);
            }
            if(!user)
            {
                return done(null , false , 
                    { message:'Invalid User'});
            }
            if(!user.authenticate(password))
            {
                return done(null , false , {message:'Invalid password'});
            }
    
            return done(null , user);
        });
    }
    ));
};
