module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      start_time: { type: DataTypes.DATE, allowNull: false },
      end_time: { type: DataTypes.DATE, allowNull: false },
      location_id: { type: DataTypes.INTEGER, allowNull: false }
    }, {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    Event.associate = function(models) {
      Event.belongsTo(models.User, { foreignKey: 'user_id' });
      Event.belongsTo(models.Location, { foreignKey: 'location_id' });
    };
  
    return Event;
  };