const db = require('../models/index.js');
const { Review } = db;

exports.getReviews = async (req, res) => {
  const id = req.params.id;
  const order = req.query.order;

  let orderBy;

  switch (order) {
    case 'rating_high':
      orderBy = [['rating', 'DESC']];
      break;
    case 'rating_low':
      orderBy = [['rating', 'ASC']];
      break;
    default:
      orderBy = [['created_at', 'DESC']];
      break;
  }
  
  try {
    const reviews = await Review.findAll({
      where: { place_id: id },
      order: orderBy
    });

    res.json(reviews);
  } catch (error) {
    console.log(error.message);
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

    if (rating !== undefined) {
      review.rating = rating;
    }
    if (comment !== undefined) {
      review.comment = comment;
    }

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