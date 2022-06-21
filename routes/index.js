var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(
    'index', 
  { title: 'Home'}
  );
});

/* GET about me page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About me' });
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects'});
});


/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services' });
});

/* GET Contact page. */
router.get('/contact_me', function(req, res, next) {
  res.render('contact_me', { title: 'Contact_me' });
});





module.exports = router;
