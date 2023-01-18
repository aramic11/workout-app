const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Session extends Model {}

Session.init(
  {
    // defines columns so itll know what date the user did the work out
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
        type: DataTypes.DATEONLY,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'session',
  }
);

module.exports = Session;