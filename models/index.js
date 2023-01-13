const User = require('./User');
const Workout = require('./Workout');
const Category = require('./Category');
const Calendar = require('./Calendar');

User.hasMany(Workout, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Category.hasMany(Workout, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

Workout.belongsTo(User, {
  foreignKey: 'user_id'
});

Workout.belongsTo(Category, {
  foreignKey: 'category_id'
});

module.exports = { User, Workout, Category, Calendar };
