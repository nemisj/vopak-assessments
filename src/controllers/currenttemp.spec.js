const mongoose = require('mongoose');

const { connect, disconnect } = require('../models/index.js');
const Location = require('../models/location.model.js');
const Current = require('../models/current.model.js');
const currenttemp = require('./currenttemp.js');

const correctDate = new Date(2020, 1, 1);

beforeAll(async () => {
  await connect();
  const covId = new mongoose.Types.ObjectId();

  await Location.create([
    {
      _id: new mongoose.Types.ObjectId(),
      country_name: 'Tunesie',
      city_name: 'Sfax',
    },
    {
      _id: covId,
      country_name: 'Portugal',
      city_name: 'Covilha',
    },
  ]);

  await Current.create([
    {
      _id: new mongoose.Types.ObjectId(),
      location: covId,
      observation_time: new Date(2019, 1, 1),
      temperature: 2019,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      location: covId,
      observation_time: correctDate,
      temperature: 2020,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      location: covId,
      observation_time: new Date(2018, 1, 1),
      temperature: 2018,
    },
  ]);
});

afterAll(async () => {
  await Location.remove();
  await Current.remove();
  await disconnect();
});

it('should give the latest measured temperature', async () => {
  const result = await currenttemp('covilha');
  expect(result).toMatchObject({
    location: {
      country: 'Portugal',
      city: 'Covilha',
    },
    current: {
      observation_time: correctDate,
      temperature: 2020,
    },
  });
});

it('should throw error if not found', async () => {
  let error = null;
  try {
    await currenttemp('zork');
  } catch (err) {
    error = err;
  }

  expect(error.code).toEqual(404);
});

it('should return zero when no temperature is there', async () => {
  const result = await currenttemp('Sfax');
  expect(result).toMatchObject({
    location: {
      country: 'Tunesie',
      city: 'Sfax',
    },
    current: {
      observation_time: new Date(0),
      temperature: 0,
    },
  });
});
