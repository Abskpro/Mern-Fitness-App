const router = require('express').Router();
const webpush = require('web-push');
const User = require('../models/User.model');
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

  User.findById(req.params.id)
    .then(data => {
      console.log('this is first data' + data);
      return data;
    })
    .then(data => {
      let subscription = {
        endpoint: data.pushData.endpoint,
        expirationTime: null,
        keys: {
          p256dh: data.pushData.keys.p256dh,
          auth: data.pushData.keys.auth,
        },
      };
      return subscription;
    })
    .then(subscription => {
      console.log(subscription);
      const payload = JSON.stringify({title: 'Exercise Added'});
      webpush
        .sendNotification(subscription, payload)
        .catch(err => console.error(err));
    });
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
module.exports = router;
module.exports = router;
module.exports = router;
