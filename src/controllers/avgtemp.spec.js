const mongoose = require('mongoose');

const { connect, disconnect } = require('../models/index.js');
const Location = require('../models/location.model.js');
const Historical = require('../models/historical.model.js');

const avgtemp = require('./avgtemp.js');

beforeAll(async () => {
  await connect();
  const sfaxId = new mongoose.Types.ObjectId();

  await Location.create([
    {
      _id: sfaxId,
      country_name: 'Tunesie',
      city_name: 'Sfax',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      country_name: 'Portugal',
      city_name: 'Covilha',
    },
  ]);

  const bag = [];
  const now = new Date();
  for (let day = 1; day <= 31; day++) {
    const temperature = day === 1 || day === 31 ? 1 : 25;

    bag.push({
      _id: new mongoose.Types.ObjectId(),
      day,
      month: 2,
      year: now.getFullYear() - 1,
      temperature,
      location: sfaxId,
    });
  }

  // a couple of historical objects from different month
  bag.push({
    _id: new mongoose.Types.ObjectId(),
    day: 2,
    month: 3,
    year: now.getFullYear() - 1,
    temperature: 7,
    location: sfaxId,
  });

  bag.push({
    _id: new mongoose.Types.ObjectId(),
    day: 31,
    month: 1,
    year: now.getFullYear() - 1,
    temperature: 7,
    location: sfaxId,
  });

  await Historical.create(bag);
});

afterAll(async () => {
  await Historical.remove();
  await Location.remove();
  await disconnect();
});

it('should throw error when location not found', async () => {
  let err;
  try {
    await avgtemp('zork', 0);
  } catch (error) {
    err = error;
  }

  expect(err.code).toEqual(404);
});

it('should return zero when no temperature is there', async () => {
  const result = await avgtemp('Covilha', 2);

  expect(result).toMatchObject({
    location: {
      country: 'Portugal',
      city: 'Covilha',
    },
    average: {
      month: 2,
      temperature: 0,
    },
  });
});

it('should return average for given city', async () => {
  const result = await avgtemp('Sfax', 2);

  expect(result).toMatchObject({
    location: {
      country: 'Tunesie',
      city: 'Sfax',
    },
    average: {
      month: 2,
      temperature: 23.5,
    },
  });
});
