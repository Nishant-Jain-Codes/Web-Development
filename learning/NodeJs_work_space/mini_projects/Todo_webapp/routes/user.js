const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user_controller');
router.get('/',usersController.user);
// router.get('/sign-in',usersController.sign_in);
// router.get('/sign-up',usersController.sign_up);
// router.get('/sign-out',usersController.sign_out);


module.exports = router;