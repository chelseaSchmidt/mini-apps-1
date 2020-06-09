const express = require('express');
const app = express();
const port = 3000;

const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const Promise = require('bluebird');
const fs = require('fs');
const writeFile = Promise.promisify(fs.writeFile);

//middleware
app.use(morgan('dev'));

//static files
app.use(express.static(path.join(__dirname, '/client/dist')));
app.use(bodyParser.text());

//routes

app.post('/', (req, res) => {

  //do stuff with JSON data in req.data
  //return result in response
  //also return form in response
  const dataIndex = req.body.indexOf('=') + 1;
  const formString = req.body.slice(dataIndex);
  console.log(formString);
  let data;

  try {
    data = JSON.parse(formString);

  } catch (error) {
    console.log('nope');
    res.status(400);
    res.send('not JSON format');
  }

  if (typeof data !== 'object' || !data) {
    writeFile(path.join(__dirname, 'converted.csv'), data)
      .then(() => {
        res.status(200);
        res.sendFile(path.join(__dirname, 'converted.csv'));
      })
      .catch(err => {
        res.status(400);
        console.log(err);
        res.send(err);
      });

  } else if (Array.isArray(data)) {
    res.status(418);
    res.send('still working on arrays');

  } else {
    //get parent object keys
    //for each key...
      //
    res.status(418);
    res.send('still working on objects');
  }

});

//listen
app.listen(port, () => {
  console.log('server is listening');
});