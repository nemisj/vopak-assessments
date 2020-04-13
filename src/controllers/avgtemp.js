const Historical = require('../models/historical.model.js');
const Location = require('../models/location.model.js');

module.exports = async (city, month) => {
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

  const now = new Date();

  // base our avg on the previous year!
  const historical = await Historical.find({
    location: currentLocation._id,
    year: now.getFullYear() - 1,
    month,
  });

  const sum = historical.reduce((sum, item) => item.temperature + sum, 0);
  const temperature = historical.length
    ? Number((sum / historical.length).toFixed(1))
    : 0;

  return {
    location: {
      country: currentLocation.country_name,
      city: currentLocation.city_name,
    },
    average: {
      month: month,
      temperature,
    },
  };
};
