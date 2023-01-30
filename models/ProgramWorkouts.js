const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class ProgramWorkouts extends Model { }

ProgramWorkouts.init(
    {
        // defines the columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        program_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'program',
              key: 'id',
              unique: false
            }
          },
          // takes the exercises from the API
        exercise_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        set_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 3,
            validate: {
                isNumeric: true
            }
        },
        rep_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,
            validate: {
                isNumeric: true
            }
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                isNumeric: true
            }
        },
        weight_type: {
            type: DataTypes.STRING,
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
        modelName: 'programWorkouts',
    }
);

module.exports = ProgramWorkouts;