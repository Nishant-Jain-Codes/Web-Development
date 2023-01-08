const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
//for any further routes , access from here 
//router.use(''routerName',require('/routerFile'))


// exporting router for other files to use
module.exports = router;
