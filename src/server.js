const express = require('express');
const { connect } = require('./models/index.js');
const currenttemp = require('./controllers/currenttemp.js');
const avgtemp = require('./controllers/avgtemp.js');

const app = express();

app.use(async (req, res, next) => {
  try {
    await connect();
  } catch (err) {
    return next(err);
  }

  return next();
});

app.get('/currenttempincovilha', async (req, res, next) => {
  let result = null;
  try {
    result = await currenttemp('Covilha');
  } catch (err) {
    return next(err);
  }

  return res.send(result);
});

app.get('/avgtempinsfax', async (req, res, next) => {
  let result = null;
  try {
    result = await avgtemp('Sfax', 7);
  } catch (err) {
    return next(err);
  }

  return res.send(result);
});

module.exports = app;
