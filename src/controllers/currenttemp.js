const Current = require('../models/current.model.js');
const Location = require('../models/location.model.js');

module.exports = async (city) => {
  const currentLocation = await Location.findOne({
    city_name: {
      $regex: city,
      $options: 'i',
    },
  }).exec();

  if (!currentLocation) {
    const err = new Error('not found');
    err.code = 404;
    throw err;
  }

  let currentTemp = await Current.findOne({
    location: currentLocation._id,
  })
    .sort('-observation_time')
    .exec();

  if (!currentTemp) {
    currentTemp = {
      observation_time: new Date(0),
      temperature: 0,
    };
  }

  const res = {
    location: {
      country: currentLocation.country_name,
      city: currentLocation.city_name,
    },
    current: {
      observation_time: currentTemp.observation_time,
      temperature: currentTemp.temperature,
    },
  };

  return res;
};
