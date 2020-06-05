const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport'); //for  authentication

const UsersRouter = require('./routes/user');
const ExercisesRouter = require('./routes/exercise');
const ProfileRouter = require('./routes/profile.js');
const PushNotification = require('./routes/push.js');
const InitiateMongoServer = require('./config/db');

require('dotenv').config();
const app = express();

// app.get('/', (req, res) => {
//   res.json({message: 'API is working'});
//   console.log('fjasjdf');
// });

InitiateMongoServer();
const port = process.env.PORT || 7000;

app.use(bodyParser.json());

//Middleware
app.use(cors());
app.use(express.json());

//passport middleware
app.use(passport.initialize());
//test if api is working or notj:w

app.use('/api/users', UsersRouter);
app.use('/api/exercise', ExercisesRouter);
app.use('/api/profile', ProfileRouter);
app.use('/api/push', PushNotification);

// app.use("/api/push", PushNotification);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
