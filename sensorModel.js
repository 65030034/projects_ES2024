const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  power: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Sensor', sensorSchema);

