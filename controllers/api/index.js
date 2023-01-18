const router = require('express').Router();

const calendarRoutes = require('./calendarRoutes');
const sessionRoutes = require('./sessionRoutes');
const userRoutes = require("./userRoutes");
const exerciseRoutes = require('./exerciseRoutes');
const programRoutes = require('./programRoutes');


router.use('/calendar', calendarRoutes);
router.use('/session', sessionRoutes);
router.use("/users", userRoutes);
router.use('/exercise',exerciseRoutes);
router.use('/program', programRoutes);

module.exports = router;
