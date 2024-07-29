const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { authenticateToken } = require('./auth.js');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const travelRoutes = require('./routes/travelRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/reviews/', authenticateToken, reviewRoutes);
app.use('/travels', authenticateToken, travelRoutes);

app.get('/', (req, res) => {
  res.send('Hello')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});