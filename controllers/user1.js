let user = require('../models/user1');
let passport = require('passport');


exports.user = function(req, res, next){
    res.render('user',{
        title : 'User',
        name : 'Student'
    });
}

exports.karish = function(req, res, next){
    res.render('user',{
        title : 'User',
        name : 'Karish'
    });
}


function getErrorMessage(err)
{
    console.log("===> Error: "+ err);
    let message = '';

    if(err.code)
    {
        switch(err.code)
        {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Oooops Something went wrong';
        }
    }
    else
    {
        for(var errName in err.errors)
        {
            if(err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    
    return message;
};

module.exports.renderSingup = function(req, res, next)
{
    if(!req.user)
    {
        let newuser=user();
        res.render('auth/signup',{
            title : 'Sign-up Form',
            messages : req.flash('error'),
            user : newuser
        });
    }
    else{
        return res.redirect('/');
    }
};

module.exports.signup = function(req, res, next) {
    //if(!req.user){
    if (!req.user && req.body.password === req.body.password_confirm) {
      console.log(req.body);
  
      let user = new user(req.body);
      user.provider = 'local';
      console.log(user);
  
      user.save((err) => {
        if (err) {
          let message = getErrorMessage(err);
  
          req.flash('error', message);
          // return res.redirect('/users/signup');
          return res.render('auth/signup', {
            title: 'Sign-up Form',
            messages: req.flash('error'),
            user: user
          });
        }
        req.login(user, (err) => {
          if (err) return next(err);
          return res.redirect('/');
        });
      });
    } else {
      return res.redirect('/');
    }
  };
  
module.exports.renderSignin = function(req, res, next)
{
    if(!req.user)
    {
        res.render('auth/signin',
        {
            title : 'Sign-in Form',
            message : req.flash('error') || req.flash('info')

        });
    }
        else
        {
            console.log(req.user);
            return res.redirect('/');
        }
    };

    module.exports.signup = function(req, res, next) {
        if (!req.user && req.body.password === req.body.password_confirm) {
          console.log(req.body);
      
          let user = new User(req.body);
          user.provider = 'local';
          console.log(user);
      
          user.save((err) => {
            if (err) {
              let message = getErrorMessage(err);
      
              req.flash('error', message);
              // return res.redirect('/users/signup');
              return res.render('auth/signup', {
                title: 'Sign-up Form',
                messages: req.flash('error'),
                user: user
              });
            }
            req.login(user, (err) => {
              if (err) return next(err);
              return res.redirect('/');
            });
          });
        } else {
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

      module.exports.signout = function(req, res, next) {
        req.logout();
        res.redirect('/');
      };
      