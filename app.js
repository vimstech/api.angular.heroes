const express     = require('express');
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const http        = require('http');

const app = express();
const heroes = require('./app/routes/heroes');
const abilities = require('./app/routes/abilities');
require('./app/database/mongodb');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true, limit: '150mb' }));
app.use(bodyParser.json());

app.use('/api/heroes', heroes);
app.use("/api/heroes/:hero_id/abilities", abilities);

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Credentials', true);
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
});

app.use((request, response, next) => {
  const error = new Error("Not found.");
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) =>  {
  response.status(error.status || 500);
  response.json({
    error: {
      message: error.message
    }
  });
});

const port = 3100;

const  server = http.createServer(app);
server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
