module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define('Location', {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      latitude: { type: DataTypes.FLOAT, allowNull: false },
      longitude: { type: DataTypes.FLOAT, allowNull: false }
    }, {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    Location.associate = function(models) {
      Location.hasMany(models.Review, { foreignKey: 'location_id' });
      Location.hasMany(models.Event, { foreignKey: 'location_id' });
    };
  
    return Location;
  };