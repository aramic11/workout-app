const sequelize = require('../config/connection');
const { User, Category, Workout } = require('../models');

const userData = require('./userData.json');
const workoutData = require('./workoutData.json');
const categoryData = require('./categoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Workout.bulkCreate(workoutData);
  await Category.bulkCreate(categoryData);
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};
seedDatabase();
