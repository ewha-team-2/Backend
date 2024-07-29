const db = require('../models/index.js');
const { Review } = db;

const calculateAvgRating = (reviews) => {
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return reviews.length ? (totalRating / reviews.length).toFixed(2) : '0.00';
};

exports.getReviews = async (req, res) => {
  const id = req.params.id;
  const order = req.query.order;

  const orderBy = {
    rating_high: [['rating', 'DESC']],
    rating_low: [['rating', 'ASC']],
  }[order] || [['created_at', 'DESC']];
  
  try {
    const reviews = await Review.findAll({
      where: { place_id: id },
      order: orderBy
    });
    const avgRating = parseFloat(calculateAvgRating(reviews));
    res.json({ avgRating, reviews });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get reviews' });
  }
};

exports.getReview = async (req, res) => {
  const { review_id } = req.params;
  try {
    const review = await Review.findByPk(review_id);

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get review' });
  }
};

exports.createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const user_id = req.user.id;
  const place_id = req.params.id;

  try {
    const review = await Review.create({
      user_id,
      rating,
      comment,
      place_id,
    });

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
};

exports.updateReview = async (req, res) => {
  const { rating, comment } = req.body;
  const user_id = req.user.id;
  const { review_id } = req.params.id;

  try {
    const review = await Review.findByPk(review_id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    if (user_id!==review.user_id) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;

    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
};

exports.deleteReview = async (req, res) => {
  const user_id = req.user.id;
  const { review_id } = req.params;

  try {
    const review = await Review.findByPk(review_id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    if (user_id!==review.user_id) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    await Review.destroy({
      where: { id: review_id }
    });
  } catch(error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};