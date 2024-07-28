module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      location_id: { type: DataTypes.INTEGER, allowNull: false },
      rating: { type: DataTypes.INTEGER, allowNull: false },
      comment: { type: DataTypes.TEXT, allowNull: true }
    }, {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    Review.associate = function(models) {
      Review.belongsTo(models.User, { foreignKey: 'user_id' });
      Review.belongsTo(models.Location, { foreignKey: 'location_id' });
    };
  
    return Review;
  };