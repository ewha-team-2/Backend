const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');
const authController = require('../controllers/authController');

router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallback);
router.get('/events', calendarController.getEvents);

module.exports = router;