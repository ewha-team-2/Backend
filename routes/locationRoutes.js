const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const { authenticateToken } = require('../auth');

router.post('/', authenticateToken, locationController.createLocation);
router.get('/', authenticateToken, locationController.getLocations);
router.get('/:id', authenticateToken, locationController.getLocation);
router.put('/:id', authenticateToken, locationController.updateLocation);
router.delete('/:id', authenticateToken, locationController.deleteLocation);

module.exports = router;