const express = require('express');
const pingRouter = require('./api/ping');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/ping', pingRouter);

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
