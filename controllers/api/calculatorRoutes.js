const router = require('express').Router();
const { SessionWorkouts } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      const calendarData = await SessionWorkouts.findAll({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(calendarData);
    } catch (err) {
      res.status(400).json(err);
    }
});

module.exports = router;