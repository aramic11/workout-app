const sequelize = require('../config/connection');
const { User, SessionWorkouts, Program, ProgramWorkouts, Session, } = require('../models');

const userData = require('./userData.json');
const workoutData = require('./workoutData.json');
const categoryData = require('./categoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  for (const workout of workoutData) {
    await SessionWorkouts.create({
      ...workout,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};
seedDatabase();
