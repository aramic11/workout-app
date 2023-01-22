const Program = require('./Program');
const Session = require('./Session');
const ProgramWorkouts = require('./ProgramWorkouts');
const SessionWorkouts = require('./SessionWorkouts');
const User = require("./User");

SessionWorkouts.belongsTo(Session, {
  foreignKey: 'session_id',
});

Session.hasMany(SessionWorkouts, {
  foreignKey: 'session_id',
  onDelete: 'CASCADE',
});

ProgramWorkouts.belongsTo(Program, {
  foreignKey: 'program_id',
});

Program.hasMany(ProgramWorkouts, {
  foreignKey: 'program_id',
  onDelete: 'CASCADE',
});

Session.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Session, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Program.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Program, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});


module.exports = {
  Program,
  ProgramWorkouts,
  Session,
  SessionWorkouts,
  User,
};