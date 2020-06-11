const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('../database/index.js');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/users', (req, res) => {
  mysql.query('INSERT INTO users () VALUES ()', (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(503);
    } else {
      res.status(201);
      res.send(results);
    }
  });
});

app.put('/users/:userId', (req, res) => {
  console.log(req.params);
  res.send(418);
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});