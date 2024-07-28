'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Travel extends Model {
    static associate(models) {
      Travel.belongsTo(models.User, { foreignKey: 'user_id' });
      Travel.hasMany(models.Plan, { foreignKey: 'travel_id' });
    }
  }

  Travel.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'Travel',
    tableName: 'Travels',
    timestamps: false
  });

  return Travel;
};