// const { formatDate } = require('fullcalendar');
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class SessionWorkouts extends Model { }

SessionWorkouts.init(
    {
        // defines columns so it could be stored later on
        session_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'session',
              key: 'id',
              unique: false
            }
          },
        exercise_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        set_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        rep_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        weight_type: {
            type: DataTypes.STRING,
        },
        comments: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'user',
              key: 'id'
            }
          },
          date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: new Date()
          }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'session_workouts',
    }
);

module.exports = SessionWorkouts;