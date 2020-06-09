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

app.post('/', (req, res) => {
  //do stuff with JSON data in req.data
  //return result in response
  res.status(418);
  res.send('still working on this');
});

//listen
app.listen(port, () => {
  console.log('server is listening');
});