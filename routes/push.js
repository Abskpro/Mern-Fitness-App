const express = require('express');
const webpush = require('web-push');
const router = require('express').Router();
const User = require('../models/User.model');

const app = express();

const publicVapidKey =
  'BI7Xe1JFXyifIbEBHBmZJp0sDnZBpuyhUOgWSUKgWDBivCMoHRKuePnP2F3yAtkDBCk9TZEITX0-kupVhBvLlKY';

const privateVapidKey = 'waJ-WuQhCmBSpBJWZFDGYlMLUjEaVpXQRfWm3xaXUa4';

webpush.setVapidDetails(
  'mailto:test@test.com',
  publicVapidKey,
  privateVapidKey,
);

//subscribe Route
router.route('/subscribe/:id').put((req, res, next) => {
  //get pushSubscrption
  const subscription = req.body;
  //send 201 resource created
  // res.status(201).json({});

  //create payload
  const payload = JSON.stringify({title: 'Push test'});
  console.log(subscription);

  User.findOneAndUpdate(
    {_id: req.params.id},
    {
      pushData: {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        },
      },
    },
  )
    .then(() => {
      res.json({success: 'push created'});
    })
    .catch(err => console.error(err));
  ////pass object into the sendnotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

module.exports = router;
