const router = require('express').Router();
const Profile = require('../models/profile.model.js');

router.route('/add/:id').post((req, res, next) => {
  const newProfile = new Profile({
    name: req.params.id,
    age: req.body.age,
    height: req.body.height,
    weight: req.body.weight,
    blood: req.body.blood,
    goal: req.body.goal,
    target: req.body.target,
  });
  newProfile
    .save()
    .then(() => res.json('profile created'))
    .catch(err => res.status(400).json('error' + err));
});

module.exports = router;
