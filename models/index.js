const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const {
  username, password, database, host, dialect,
} = config;
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: false // 쿼리 실행 시 콘솔창에 출력 안함
});

const User = require('./user')(sequelize, DataTypes);
const Plan = require('./plan')(sequelize, DataTypes);
const Review = require('./review')(sequelize, DataTypes);

const db = {};

db.sequelize = sequelize;
db.User = User;
db.Plan = Plan;
db.Review = Review;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;