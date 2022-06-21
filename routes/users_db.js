var express = require('express');
var router = express.Router();

let user_dbController = require('../controllers/users_db');


function requireAuth( req, res, next){
    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    }
    next();
}

router.get('/list',user_dbController.userList);


// display edit page
router.get('/edit/:id', requireAuth,user_dbController.displayEditPage);

//process the edit request
router.post('/edit/:id', requireAuth,user_dbController.processEditPage);

// Display the Add page 
router.get('/add', requireAuth, user_dbController.displayAddPage);

//Process the Add page  
router.post('/add', requireAuth, user_dbController.processAddPage);

// process the delete page 
router.get('/delete/:id',requireAuth, user_dbController.performDelete);

module.exports = router;