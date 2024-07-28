const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
/*
const locationRoutes = require('./routes/locationRoutes');
const eventRoutes = require('./routes/eventRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
*/

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
/*
app.use('/locations', locationRoutes);
app.use('/events', eventRoutes);
app.use('/calendar', calendarRoutes);
app.use('/reviews', reviewRoutes);
app.use('/budgets', budgetRoutes);
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});