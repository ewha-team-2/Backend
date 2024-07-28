const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticateToken } = require('../auth');

router.post('/', authenticateToken, eventController.createEvent);
router.get('/', authenticateToken, eventController.getEvents);
router.get('/:id', authenticateToken, eventController.getEvent);
router.put('/:id', authenticateToken, eventController.updateEvent);
router.delete('/:id', authenticateToken, eventController.deleteEvent);

module.exports = router;