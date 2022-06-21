let userModel = require('../models/user1');
let passport = require('passport');

exports.user = function(req, res, next)
{
  res.render('user',{
    title : 'Users',
    name : 'Student'
  });
}

exports.karish = function(req, res, next){
  res.render('user',{
    title :'User',
    name : 'Karish'
  });
}

function getErrorMessage(err){
  console.log("===> Error: "+ err);
  let message ='';

  if(err.code){
    switch(err.code){
      case 11000:
      case 110001:
          message = 'User already exists';
          break;
        default:
          message = 'Oooops Something went wrong'; 
    }
  }else{
    for(var errName in err.errors){
      if(err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

module.exports.renderSignup = function(req, res, next){
  if(!req.user){
    //create a new user
    let newUser = userModel();
    res.render('auth/signup',{
      title: 'Sign-up Form',
      messages : req.flash('error'),
      user : newUser
    });
  }else{
    return res.redirect('/');
  }
};

//process signup
module.exports.signup = function(req, res, next){
  if(!req.user){
    console.log(req.body);

    let user = new userModel(req.body);
    console.log(user);

    user.save((err)=>{
      if(err){
        let message = getErrorMessage(err);
        req.flash('error',message);

        return res.render('auth/signup',{
          title : 'Sign-up Form',
          messages : req.flash('error'),
          user : user
        });
      }
      req.login(user, (err)=>{
        if(err) return next(err);
        return res.redirect('/');
      });
    });
  }else{
    return res.redirect('/');
  }
};

//signin methods

module.exports.renderSignin = function(req, res, next){
  if(!req.user){
    res.render('auth/signin', {
      title : 'Sign-in Form', 
      messages : req.flash('error') || req.flash('info')
      });
    } else{
      //console.log(req.user);
      return res.redirect('/');
    }
  };

  
  module.exports.signin = function(req, res, next){
    passport.authenticate('local', {   
      successRedirect: req.session.url || '/',
      failureRedirect: '/users/signin',
      failureFlash: true
    })(req, res, next);
    delete req.session.url;
  }


  module.exports.signout = function(req, res, next){
    req.logout();
    res.redirect('/');
  };
  