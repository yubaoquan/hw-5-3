const mongoose = require('mongoose');
const { dbUri } = require('./config/config.default');

module.exports = () => {
  mongoose.connect(dbUri, {
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
};
