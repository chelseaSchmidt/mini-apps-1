const express = require('express');
const app = express();
const port = 3000;

const morgan = require('morgan');

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const path = require('path');

const Promise = require('bluebird');
const fs = require('fs');
const writeFile = Promise.promisify(fs.writeFile);
const appendFile = Promise.promisify(fs.appendFile);

//middleware
app.use(morgan('dev'));

//static files
app.use(express.static(path.join(__dirname, '/client')));
console.log(path.join(__dirname, '/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes

app.post('/', upload.single('file'), (req, res) => {
  const formString = req.file.buffer.toString();
  let data;

  try {
    data = JSON.parse(formString);

  } catch (error) {
    res.status(400);
    res.send('not JSON format');
  }

  if (typeof data !== 'object' || !data) {
    writeFile(path.join(__dirname, 'converted.csv'), data)
      .then(() => {
        res.status(200);
        res.sendFile(path.join(__dirname, 'converted.csv'));
      })
      .catch(err => { res.sendStatus(500); });

  } else if (Array.isArray(data)) {
    res.status(400);
    res.send('please use JSON object notation');

  } else {
    const columns = Object.keys(data);
    let columnString = '';
    columns.forEach((key) => {
      if (key !== 'children') {
        columnString += `${key},`;
      }
    });
    columnString = columnString.slice(0, -1);
    columnString += '\n';
    const lines = [];
    writeFile(path.join(__dirname, 'converted.csv'), columnString)
      .then(() => {
        writeLineToFile(data);

        Promise.all(lines)
          .then(() => {
            res.status(200);
            res.sendFile(path.join(__dirname, 'converted.csv'));
          })
          .catch(err => {
            res.status(400);
            console.log(err);
            res.send(err);
          });
      })
      .catch(err => {
        res.status(400);
        console.log(err);
        res.send(err);
      });

    function writeLineToFile(object) {
      let line = '';
      for (key in object) {
        if (key !== 'children') {
          line += `${object[key]},`
        }
      }
      line.slice(0, -1);
      line += '\n';
      lines.push(appendFile(path.join(__dirname, 'converted.csv'), line));
      object.children.forEach(child => {
        writeLineToFile(child);
      });
    }
  }

});

//listen
app.listen(port, () => {
  console.log('server is listening');
});