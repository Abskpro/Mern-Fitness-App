const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const profileSchema = {
  name: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  blood: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },
  target: {
    type: Number,
    required: true,
  },
};

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
