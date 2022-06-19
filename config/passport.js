const passport = require('passport');
//const user = require('../models/user1');

module.exports = function()
{
    const user = require('../models/user1');

    //to save the id of authenticated user to the session
    passport.serializeUser((user , done) => {
        done(null, user.id);

    });

    //to grab the user from Db when needed

    passport.deserializeUser((id, done) =>{
        user.findOne(
            {_id : id},
            '-passport -salt',
(err, user) => {
    done(err,user);
}
        );
    });


    require('./local')();
}