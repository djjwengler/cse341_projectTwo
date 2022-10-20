const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./src/database/connect');
const port = process.env.PORT || 3000;
const db = process.env.DB_NAME;
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(bodyParser.json()).use('/', require('./src/routes'));

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDatabase((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to database ${db} and listening on ${port}`);
  }
});
