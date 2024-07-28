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
const Location = require('./location')(sequelize, DataTypes);
const Event = require('./event')(sequelize, DataTypes);
const Review = require('./review')(sequelize, DataTypes);
const Budget = require('./budget')(sequelize, DataTypes);

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });
Location.hasMany(Review, { foreignKey: 'location_id' });
Review.belongsTo(Location, { foreignKey: 'location_id' });
User.hasMany(Budget, { foreignKey: 'user_id' });
Budget.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Event, { foreignKey: 'user_id' });
Event.belongsTo(User, { foreignKey: 'user_id' });
Location.hasMany(Event, { foreignKey: 'location_id' });
Event.belongsTo(Location, { foreignKey: 'location_id' });

sequelize.sync();

module.exports = {
  sequelize,
  User,
  Location,
  Event,
  Review,
  Budget
};