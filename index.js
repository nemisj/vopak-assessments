const app = require('./src/server.js');

const port = Number(process.env.PORT) || 2310;

app.listen(port, () => {
  console.log(`Server listening on ::${port}`);
});
