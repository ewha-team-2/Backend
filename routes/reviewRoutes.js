const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateToken } = require('../auth.js');

router.post('/:id', reviewController.createReview);
router.get('/:id', reviewController.getReviews);
router.get('/:id/:review_id', reviewController.getReview);
router.patch('/:id/:review_id', reviewController.updateReview);
router.delete('/:id/:review_id', reviewController.deleteReview);

module.exports = router;