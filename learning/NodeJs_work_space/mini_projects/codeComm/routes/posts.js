const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts_controller');
router.get('/',postsController.posts);
router.get('/analytics',postsController.analytics);
router.post('/create',postsController.create);
module.exports = router;
