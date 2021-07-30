const express = require('express');
const { appPort: port } = require('./config/config.default');
const initDb = require('./db');
const errorHandler = require('./middleware/error-handler');
const initRouter = require('./router');

initDb();
const app = express();

app.use(express.json());
initRouter(app);
app.use(errorHandler);

app.listen(port, () => {
  console.info(`server running on http://localhost:${port}`);
});
