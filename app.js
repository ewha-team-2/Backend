const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { authenticateToken } = require('./auth.js');
const cors = require('cors');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const travelRoutes = require('./routes/travelRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use('/auth', authRoutes);
app.use('/reviews', authenticateToken, reviewRoutes);
app.use('/travels', authenticateToken, travelRoutes);

app.get('/', (req, res) => {
  res.send('Hello')
})

app.get('/logout', (req, res) => {
  res.clearCookie('jwt', { path: '/' });
  res.redirect('http://localhost:3000/login');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});