const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

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