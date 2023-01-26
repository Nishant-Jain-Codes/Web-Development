const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag_controller')
router.post('/create',tagController.create);
module.exports = router;