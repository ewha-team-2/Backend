const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');
const planController = require('../controllers/planController');
const { authenticateToken } = require('../middleware/auth');

// 여행
router.post('/', authenticateToken, travelController.createTravel);
router.get('/', authenticateToken, travelController.getTravels);
router.get('/:id', authenticateToken, travelController.getTravel);
router.patch('/:id', authenticateToken, travelController.updateTravel);
router.delete('/:id', authenticateToken, travelController.deleteTravel);

// 계획
router.post('/:id/plans', authenticateToken, planController.createPlan);
router.get('/:id/plans', authenticateToken, planController.getPlans);
router.get('/:id/plans/:plan_id', authenticateToken, planController.getPlan);
router.patch('/:id/plans/:plan_id', authenticateToken, planController.updatePlan);
router.delete('/:id/plans/:plan_id', authenticateToken, planController.deletePlan);


module.exports = router;