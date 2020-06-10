const path = require('path');
const Promise = require('bluebird');
const fs = require('fs');
const writeFile = Promise.promisify(fs.writeFile);
const appendFile = Promise.promisify(fs.appendFile);

module.exports.getRecentFile = (req, res) => {
  res.status(200);
  res.attachment(path.join(__dirname, 'converted.csv'));
  res.sendFile(path.join(__dirname, 'converted.csv'));
};

module.exports.generateCSV = (req, res) => {
  const formString = req.file.buffer.toString();
  let data;

  //handle errors if data not parseable
  try {
    data = JSON.parse(formString);

  } catch (error) {
    res.status(400);
    res.send('not JSON format, please fix');
  }

  //allow JSON non-collections
  if (typeof data !== 'object' || !data) {
    writeFile(path.join(__dirname, 'converted.csv'), data)
      .then(() => {
        res.status(200);
        res.sendFile(path.join(__dirname, 'converted.csv'));
      })
      .catch(err => { res.sendStatus(500); });

  //reject JSON arrays
  } else if (Array.isArray(data)) {
    res.status(400);
    res.send('JSON arrays not implemented currently');

  //accept objects with 'children' property
  } else {

    const columns = Object.keys(data);
    let csvString = '';
    columns.forEach((key) => {
      if (key !== 'children') {
        csvString += `${key},`;
      }
    });
    csvString = csvString.slice(0, -1);
    csvString += '\n';
    addLines(data);
    csvString = csvString.slice(0, -1);

    writeFile(path.join(__dirname, 'converted.csv'), csvString)
      .then(() => {
        res.status(200);
        res.attachment(path.join(__dirname, 'converted.csv'));
        res.sendFile(path.join(__dirname, 'converted.csv'));
      })
      .catch(err => {
        res.status(400);
        console.log(err);
        res.send(err);
      });

    function addLines(object) {
      let line = '';
      for (key in object) {
        if (key !== 'children') {
          line += `${object[key]},`
        }
      }
      line = line.slice(0, -1);
      line += '\n';
      csvString += line;
      object.children.forEach(child => {
        addLines(child);
      });
    }
  }
};