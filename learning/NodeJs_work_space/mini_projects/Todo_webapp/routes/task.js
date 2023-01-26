const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task_controller');
router.post('/create',taskController.create);
module.exports = router;