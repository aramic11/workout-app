const router = require('express').Router();
const loginRoutes = require('./loginRoutes');
const calendarRoutes = require('./calendarRoutes');
const userRoutes = require('./userRoutes');

router.use('/login', loginRoutes);
router.use('/calendar', calendarRoutes);
router.use('/users', userRoutes);

module.exports = router;
