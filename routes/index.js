var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' , userName:'Karishma' });
});

/* GET about me page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About me' , userName:'Karishma'});
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects' , userName:'Karishma'});
});


/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services' , userName:'Karishma'});
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' , userName:'Karishma'});
});





module.exports = router;
