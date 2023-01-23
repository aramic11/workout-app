const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, SessionWorkouts, ProgramWorkouts } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', (req, res) => {
  res.render('homepage',
  {
    logged_in: req.session.logged_in,
  });
});

// Requires login to use exercise
router.get('/exercise', (req, res) => {
  if (req.session.logged_in) {
    res.render('exercise', {
      logged_in: req.session.logged_in,
    });
    return;
  }
  res.redirect('/login');
});

// Gets database information, trims the data to the necessary information, and then renders if user is logged in
router.get('/calendar', async (req, res) => {
  if (req.session.logged_in) {
    const calendarData = await ProgramWorkouts.findAll({});
    const calendars = calendarData.map((calendar) => calendar.get({ plain: true }));
    console.log(calendars)
    res.render('calendar', {
      logged_in: req.session.logged_in,
      calendars,
    });
    return;
  }
  res.redirect('/login');
});

// Returns user to homepage if they were already logged in
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;