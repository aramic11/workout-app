const router = require('express').Router();
const { Session, SessionWorkouts } = require('../../models');
const withAuth = require('../../utils/auth');

// GET Routes
// This allows the user to find all the sessions with the workouts
router.get('/', withAuth, async (req, res) => {
  try {
    const sessionData = await Session.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [{ model: SessionWorkouts }]
    });
    res.status(200).json(sessionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find the session by its ID and to include all workouts for that user
router.get('/:date', withAuth, async (req, res) => {
  try {
    const sessionData = await Session.findOne({
      where: {
        user_id: req.session.user_id,
        date: req.params.date
      }
    });
    if (!sessionData) {
      res.status(404).json({ message: 'No session associated with this id!' });
      return;
    }
    res.status(200).json(sessionData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// POST routes
// Creates a new session
router.post('/', withAuth, async (req, res) => {
  try {
    const sessionData = await Session.create({
      date: req.body.date,
      user_id: req.session.user_id
    });
    res.status(200).json(sessionData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new workout program
router.post('/wkts/', withAuth, async (req, res) => {
  try {
    for (let i=0; i < req.body.length; i++){
      req.body[i].user_id = req.session.user_id;
    }
    
    const sessionData = await SessionWorkouts.bulkCreate(req.body);
    res.status(200).json(sessionData);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
