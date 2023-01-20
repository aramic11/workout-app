const router = require('express').Router();
const sequelize = require('../config/connection');
const User = require('../models');
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

// Requires login to use calendar
router.get('/calendar', (req, res) => {
  if (req.session.logged_in) {
    res.render('calendar', {
      logged_in: req.session.logged_in,
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