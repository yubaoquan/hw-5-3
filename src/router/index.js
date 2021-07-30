const login = require('./login');
const user = require('./user');

module.exports = (app) => {
  app.use(login);
  app.use(user);
};
