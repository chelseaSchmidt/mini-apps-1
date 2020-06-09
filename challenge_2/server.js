const express = require('express');
const app = express();
const port = 3000;

const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

//static files
app.use(express.static(path.join(__dirname, '/client/dist')));

//routes
app.get('/', (req, res) => {
  res.sendStatus(200);
});

//listen
app.listen(port, () => {
  console.log('server is listening');
});