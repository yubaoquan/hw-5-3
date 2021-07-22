const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config.default');
const errorHandler = require('./middleware/error-handler');
const { login, user } = require('./router');

mongoose.connect(config.dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Connect fail', err);
});

db.once('open', () => {
  console.info('db connect success');
});

const app = express();

app.use(express.json());

app.use(login);
app.use(user);
app.use(errorHandler);

const port = 9000;
app.listen(port, () => {
  console.info(`server running on http://localhost:${port}`);
});
