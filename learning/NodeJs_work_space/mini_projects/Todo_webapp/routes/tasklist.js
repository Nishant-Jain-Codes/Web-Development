const express = require('express');
const passport = require('passport');
const router = express.Router();
const tasklistController = require('../controllers/tasklist_controller');
router.get('/',passport.checkAuthentication,tasklistController.tasklist);
module.exports = router;