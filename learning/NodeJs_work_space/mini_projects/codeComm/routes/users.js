const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
router.get('/',usersController.user);
router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);
router.get('/profile',usersController.profile);
module.exports = router;