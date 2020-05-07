const router = require('express').Router();
const Profile = require('../models/profile.model.js');

router.route('/add/:id').post((req, res, next) => {
  const newProfile = new Profile({
    createdBy: req.params.id,
    name: req.body.name,
    age: req.body.age,
    height: req.body.height,
    weight: req.body.weight,
    blood: req.body.bloodT,
    workout: req.body.workoutT,
    target: req.body.tweight,
  });
  newProfile
    .save()
    .then(() => res.json('profile created'))
    .catch(err => res.status(400).json('error' + err));
});

router.route('/:id').get((req, res, next) => {
  Profile.findOne({createdBy: req.params.id})
    .then(profile => res.json(profile))
    .catch(err => res.status(400).json('error' + err));
});

router.route('/update/:id').put((req, res, next) => {
  console.log(req.body);
  const data = {
    name: req.body.name,
    age: req.body.age,
    height: req.body.height,
    weight: req.body.weight,
    blood: req.body.bloodT,
    workout: req.body.workoutT,
    target: req.body.tweight,
  };
  Profile.findOneAndUpdate({createdBy: req.params.id}, {data}).then(
    res.json({message: data}),
  );
});

module.exports = router;
