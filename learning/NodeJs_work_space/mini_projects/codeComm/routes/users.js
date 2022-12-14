const express = require('express');
const passport = require('passport');
const router = express.Router();
const usersController = require('../controllers/users_controller');
router.get('/',usersController.user);
router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);
router.get('/sign-out',usersController.destroySession);
router.get('/profile',passport.checkAuthentication,usersController.profile);
router.post('/create',usersController.create);
//use passport as a middle ware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect: '/users/sign-in'
    },
),usersController.createSession);
module.exports = router;