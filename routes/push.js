const express = require('express');
const webpush = require('web-push');
const router = require('express').Router();

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
router.route('/subscribe').post((req, res, next) => {
  //get pushSubscrption
  const subscription = req.body;
  console.log(subscription);
  //send 201 resource created
  res.status(201).json({});

  //create payload
  const payload = JSON.stringify({title: 'Push test'});

  //pass object into the sendnotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

module.exports = router;
