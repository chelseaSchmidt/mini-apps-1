//required functions and libraries
const express = require('express');
const app = express();
const port = 3000;

const morgan = require('morgan');
const multer = require('multer');
const upload = multer();
const path = require('path');

const getRecentFile = require('./routeHandlers.js').getRecentFile;
const generateCSV = require('./routeHandlers.js').generateCSV;

//server setup
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client')));
app.get('/converted.csv', getRecentFile);
app.post('/converted.csv', upload.single('file'), generateCSV);

app.listen(port, () => {
  console.log('server is listening');
});