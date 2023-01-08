const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
router.get('/',homeController.home);
router.get('/add-todo',homeController.add_todo);
router.post('/toggle-todo',homeController.toggle_todo);
router.post('/delete-todo',homeController.delete_todo);
module.exports = router;