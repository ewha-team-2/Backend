const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user) {
  return jwt.sign({
    id: user.id,
    displayName: user.name,
    email: user.email
  }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return res.redirect('/');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.redirect('/');
    }
    req.user = user;
    next();
  });
}

module.exports = {
  generateToken,
  authenticateToken
};