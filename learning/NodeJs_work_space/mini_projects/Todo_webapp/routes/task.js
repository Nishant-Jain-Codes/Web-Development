const express = require('express');
const router = express.Router();
const taskContoller = require('../controllers/task_controller');
router.post('/create',taskContoller.create);
module.exports = router;