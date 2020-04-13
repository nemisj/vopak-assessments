const mongoose = require('mongoose');

const { MONGO_URL = 'mongodb://localhost:27017/test' } = process.env;

const connect = async () => {
  const connection = mongoose.connection;
  const readyState = connection.readyState;

  if (readyState !== connection.states.disconnected) {
    return;
  }

  return mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const disconnect = async () => {
  await mongoose.connection.close();
};

module.exports = {
  connect,
  disconnect,
};
