const express = require('express');
const passport = require('passport');
const router = express.Router();
const usersController = require('../controllers/user_controller');
router.get('/',usersController.user);
router.get('/sign-in',usersController.sign_in);
router.get('/sign-up',usersController.sign_up);
router.get('/sign-out',usersController.destroySession);
router.post('/create',usersController.create);
router.post('/create-session',passport.authenticate('local',{
    failureRedirect: '/user/sign-in'
}),usersController.create);
module.exports = router;