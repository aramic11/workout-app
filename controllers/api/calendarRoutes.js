const router = require('express').Router();
const { SessionWorkouts } = require('../../models');
const withAuth = require('../../utils/auth');




// Fetch session workouts
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

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const calendarData = await Calendar.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!calendarData) {
//       res.status(404).json({ message: 'No calendar found with this id!' });
//       return;
//     }

//     res.status(200).json(calendarData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
