const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');
const planController = require('../controllers/planController');

// 여행
router.post('/', travelController.createTravel);
router.get('/', travelController.getTravels);
router.get('/:id', travelController.getTravel);
router.patch('/:id', travelController.updateTravel);
router.delete('/:id', travelController.deleteTravel);

// 계획
router.post('/:id/plans', planController.createPlan);
router.get('/:id/plans', planController.getPlans);
router.get('/:id/plans/:plan_id', planController.getPlan);
router.patch('/:id/plans/:plan_id', planController.updatePlan);
router.delete('/:id/plans/:plan_id', planController.deletePlan);

module.exports = router;