const express = require('express');
const app = express();
const port = 3000;

const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

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
  let dataIndex = req.body.indexOf('=') + 1;
  let formString = req.body.slice(dataIndex);
  try {
    JSON.parse(formString);
    res.status(418);
    res.send('still working on this');
  } catch (error) {
    console.log('nope');
    res.status(400);
    res.send('not JSON format');
  }


  // req.on('data', chunk => {
  //   formString += chunk.toString();
  // });

  // req.on('end', () => {
  //   let dataIndex = formString.indexOf('=') + 1;
  //   formString = formString.slice(dataIndex);
  //   // console.log(formString);
  //   res.status(418);
  //   res.send('still working on this');
  // });

});

//listen
app.listen(port, () => {
  console.log('server is listening');
});