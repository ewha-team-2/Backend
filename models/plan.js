'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    static associate(models) {
      Plan.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });
    }
  }

  Plan.init({
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    travel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Travels',
        key: 'id'
      }
    },
    place_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    budget: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    sequelize,
    modelName: 'Plan',
    tableName: 'Plans',
    timestamps: false,
  });

  return Plan;
};