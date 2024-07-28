const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const { authenticateToken } = require('..//auth');

router.post('/', authenticateToken, planController.createPlan);
router.get('/', authenticateToken, planController.getPlans);
router.get('/:id', authenticateToken, planController.getPlan);
router.put('/:id', authenticateToken, planController.updatePlan);
router.delete('/:id', authenticateToken, planController.deletePlan);

module.exports = router;