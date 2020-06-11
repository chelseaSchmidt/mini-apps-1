const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.listen(port, () => {
  console.log('Good to go');
});
