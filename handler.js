const serverless = require('serverless-http');
const app = require('./src/server.js');

module.exports = {
    main: serverless(app),
};
