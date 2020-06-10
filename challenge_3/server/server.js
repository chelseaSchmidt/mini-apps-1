const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('../database/index.js');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.post('/users', (req, res) => {
  mysql.query('SELECT * FROM USERS', (err, results) => {
    if (err) {
      console.log(error);
      res.sendStatus(503);
    } else {
      res.status(201);
      res.send(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});