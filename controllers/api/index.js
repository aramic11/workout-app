const router = require('express').Router();
const loginRoutes = require('./loginRoutes');
const calendarRoutes = require('./calendarRoutes');

router.use('/login', loginRoutes);
router.use('/calendar', calendarRoutes);

module.exports = router;
