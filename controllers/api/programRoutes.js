const router = require('express').Router();
const { Program, ProgramWorkouts } = require('../../models');
const withAuth = require('../../utils/auth');

// GET Routes
// Finds all exercise programs for the user
router.get('/', withAuth, async (req, res) => {
  try {
    const programData = await Program.findAll({
      where: {
        user_id: req.session.user_id
      }
    });
    res.status(200).json(programData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// The find one exercise program and inculde all workouts
router.get('/id/:id', withAuth, async (req, res) => {
  try {
    const programData = await Program.findByPk(req.params.id, {
      where: {
        user_id: req.session.user_id
      },
      include: [{ model: ProgramWorkouts }]
    });

    if (!programData) {
      res.status(404).json({ message: 'No program was associated with this ID!' });
      return;
    }
    res.status(200).json(programData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find program id with the name among the users workouts
router.get('/query', withAuth, async (req, res) => {
  try {
    const programData = await Program.findOne({
      where: {
        user_id: req.session.user_id,
        program_name: req.query.name
      }
    });
    if (!programData) {
      res.status(404).json({ message: 'No program was associated with this name!' });
      return;
    }

    res.status(200).json(programData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST Routes
//To create a new exercise program
router.post('/', withAuth, async (req, res) => {
  try {
    const programData = await Program.create({
      program_name: req.body.program_name,
      user_id: req.session.user_id
    });
    res.status(200).json(programData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create new program
router.post('/wkts/', withAuth, async (req, res) => {
  try {
    for (let i = 0; i < req.body.length; i++) {
      req.body[i].user_id = req.session.user_id;
    }
    const programData = await ProgramWorkouts.bulkCreate(req.body);
    res.status(200).json(programData);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
