module.exports = (sequelize, DataTypes) => {
    const Budget = sequelize.define('Budget', {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      amount: { type: DataTypes.FLOAT, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      date: { type: DataTypes.DATE, allowNull: false }
    }, {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    Budget.associate = function(models) {
      Budget.belongsTo(models.User, { foreignKey: 'user_id' });
    };
  
    return Budget;
  };