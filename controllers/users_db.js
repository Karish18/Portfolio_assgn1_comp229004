//provide reference of the user_db.js in the models folder
let userModel = require('../models/users_db');

module.exports.userList = function(req,res,next){

    userModel.find((err,userList) =>{
         if (err)
         {
             return console.error(err);
         }
         else
         {
             //console.log(userList);
            res.render('users_db/List',{title : 'Users List',UserList: userList})

         }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    userModel.findById(id, (err, userToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('users_db/add_edit', {
                title: 'Edit User', 
                user: userToEdit
            })
        }
    });
}


module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedUser = userModel({
        _id: req.body.id,
        email_id: req.body.email_id,
        user_name: req.body.username,
        contact: req.body.contact,
        tags: req.body.tags.split(",").map(word => word.trim())
    });


userModel.updateOne({_id: id}, updatedUser, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/users_db/list');
        }
    });
}


module.exports.displayAddPage = (req, res, next) => {
    let newUser = userModel();

    res.render('users_db/add_edit', {
        title: 'Add a new User',
        user: newUser
    })          
}

module.exports.processAddPage = (req, res, next) => {

    let newUser = userModel({
        _id: req.body.id,
        email_id: req.body.email_id,
        user_name: req.body.username,
        contact: req.body.contact,
        tags: req.body.tags.split(",").map(word => word.trim())
    });

    userModel.create(newUser, (err, user) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(user);
            res.redirect('/users_db/list');
        }
    });

}


module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    userModel.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/users_db/list');
        }
    });
}
