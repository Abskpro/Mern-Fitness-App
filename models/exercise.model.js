const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const exerciseSchema = new Schema({
  workout: {
    type: String,
    required: true,
  },
  set: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
exerciseSchema.plugin(timestamps);

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
