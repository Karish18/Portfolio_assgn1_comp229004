var express = require('express');
var router = express.Router();

let user_dbController = require('../controllers/users_db');
router.get('/list',user_dbController.userList);


// display edit page
router.get('/edit/:id', user_dbController.displayEditPage);

//process the edit request
router.post('/edit/:id', user_dbController.processEditPage);

// Display the Add page 
router.get('/add', user_dbController.displayAddPage);

//Process the Add page  
router.post('/add', user_dbController.processAddPage);

// process the delete page 
router.get('/delete/:id', user_dbController.performDelete);

module.exports = router;