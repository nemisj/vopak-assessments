const mongoose = require('mongoose');
const { Schema } = mongoose;

const Location = mongoose.model('location', {
  _id: Schema.Types.ObjectId,
  country_name: String,
  city_name: String,
});

module.exports = Location;
