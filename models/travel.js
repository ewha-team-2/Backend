'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Travel extends Model {
    static associate(models) {
      Travel.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });
      Travel.hasMany(models.Plan, { foreignKey: 'travel_id', sourceKey: 'id' });
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
      type: DataTypes.STRING,
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
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Travel',
    tableName: 'Travels',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Travel;
};