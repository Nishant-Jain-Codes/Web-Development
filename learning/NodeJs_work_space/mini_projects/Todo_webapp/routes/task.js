const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task_controller');
router.post('/create',taskController.create);
router.get('/destroy/:id',taskController.destroy)
// TODO add update functionality
// router.get('/update/:id',taskController.update);
module.exports = router;