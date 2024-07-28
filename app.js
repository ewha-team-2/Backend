const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { authenticateToken } = require('./auth.js');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
/*
const locationRoutes = require('./routes/locationRoutes');
const eventRoutes = require('./routes/eventRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
*/

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/reviews/', authenticateToken, reviewRoutes);
/*
app.use('/locations', locationRoutes);
app.use('/events', eventRoutes);
app.use('/calendar', calendarRoutes);
app.use('/budgets', budgetRoutes);
*/
app.get('/', (req, res) => {
  res.send('Hello')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});