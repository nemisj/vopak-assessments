const mongoose = require('mongoose');
const { Schema } = mongoose;

const Current = mongoose.model('current_temperature', {
  _id: Schema.Types.ObjectId,
  observation_time: Date,
  temperature: Number,
  location: { type: Schema.Types.ObjectId, ref: 'location' },
});

module.exports = Current;
