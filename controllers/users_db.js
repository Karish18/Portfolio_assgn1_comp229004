//provide reference of the user_db.js in the models folder
let userDb = require('../models/users_db');

module.exports.userList = function(req,res,next){

    userDb.find((err,userList) =>{
         if (err)
         {
             return console.error(err);
         }
         else
         {
             console.log(userList);
            // res.render('Users/List',{title : 'Users List',UserList: userList})

         }
    });
}