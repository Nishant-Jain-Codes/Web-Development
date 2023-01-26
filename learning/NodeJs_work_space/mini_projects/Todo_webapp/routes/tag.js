const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag_controller')
router.post('/create',tagController.create);
// TODO add delete functionality
// router.post('/create',tagController.destroy);
// TODO add update functionality
// router.get('/update/:id',tagController.update);
module.exports = router;