var express = require('express');
var router = express.Router();

let user_dbController = require('../controllers/users_db');
router.get('/list',user_dbController.userList);


module.exports = router;