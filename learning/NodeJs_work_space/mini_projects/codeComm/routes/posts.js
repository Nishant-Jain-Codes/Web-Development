const express = require('express');
const passport = require('passport');
const router = express.Router();
const postsController = require('../controllers/posts_controller');
router.get('/',postsController.posts);
router.get('/analytics',postsController.analytics);
router.post('/create',passport.checkAuthentication,postsController.create);
router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy);
module.exports = router;
