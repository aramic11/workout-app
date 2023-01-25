const router = require('express').Router();
const { SessionWorkouts, ProgramWorkouts } = require('../../models');
const withAuth = require('../../utils/auth');




// Fetch program workouts
router.get('/', withAuth, async (req, res) => {
  try {
    console.log(req.body)
    const calendarData = await SessionWorkouts.findAll({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(calendarData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a workout based on id
router.delete('/:id/', withAuth, async (req, res) => {
  try {
    console.log("running", req.params)
    const calendarData = await ProgramWorkouts.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!calendarData) {
      res.status(404).json({ message: 'No workout found with this id!' });
      return;
    }

    res.status(200).json(calendarData);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
