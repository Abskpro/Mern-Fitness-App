const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  profile: {
    type: Boolean,
    required: true,
    default: false,
  },
  pushData: {
    endpoint: {
      type: String,
      default: 'data',
    },
    keys: {
      p256dh: {
        type: String,
        default: 'data',
      },
      auth: {
        type: String,
        default: 'data',
      },
    },
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
