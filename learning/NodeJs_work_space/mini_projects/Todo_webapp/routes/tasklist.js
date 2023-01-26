const express = require('express');
const passport = require('passport');
const router = express.Router();
const tasklistController = require('../controllers/tasklist_controller');
router.get('/',passport.checkAuthentication,tasklistController.tasklist);
router.use('/task',require('./task'));
router.use('/tag',require('./tag'));
module.exports = router;