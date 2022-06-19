var express = require('express');
var router = express.Router();
var userController = require('../controllers/user1');

router.get('/', userController.user);

router.get('/karish', userController.karish);

//signup
router.get('/signup' , userController.renderSignup);
router.post('/signup', userController.signup);


//signin
//router.get('/signin' , userController.renderSignin);
//router.post('/signin' , userController.signin);


//router.get('/signout' , userController.signout);

/* GET users listing.
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});
*/
module.exports = router;