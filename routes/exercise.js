const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/add/:id').post((req, res) => {
  const workout = req.body.workout;
  const set = req.body.set;
  const weight = req.body.weight;
  const reps = req.body.reps;
  const createdBy = req.params.id;

  const newExercise = new Exercise({
    workout,
    set,
    weight,
    reps,
    createdBy,
  });
  newExercise
    .save()
    .then(() => res.json('exercise added'))
    .catch(err => res.status(400).json('error' + err));
});

router.route('/display/:id').get((req, res) => {
  Exercise.find({createdBy: req.params.id})
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('error' + err));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('exercise deleted'))
    .catch(err => res.status(400).json('error' + err));
});

module.exports = router;
