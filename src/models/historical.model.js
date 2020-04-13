const mongoose = require('mongoose');
const { Schema } = mongoose;

const Historical = mongoose.model('historical_temperature_day', {
  _id: Schema.Types.ObjectId,
  day: Number,
  month: Number,
  year: Number,
  temperature: Number,
  location: { type: Schema.Types.ObjectId, ref: 'location' },
});

module.exports = Historical;
