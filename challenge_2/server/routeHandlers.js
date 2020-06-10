const path = require('path');
const Promise = require('bluebird');
const fs = require('fs');
const writeFile = Promise.promisify(fs.writeFile);

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

    //generate string in CSV convention
    const columns = Object.keys(data);
    let csvString = '';
    columns.forEach((key) => {
      if (key !== 'children') {
        csvString += `${key},`;
      }
    });
    csvString = csvString.slice(0, -1); //remove trailing comma
    csvString += '\n';
    addLines(data);
    csvString = csvString.slice(0, -1); //remove trailing new line

    //write completed string to a csv file and send to client
    writeFile(path.join(__dirname, 'converted.csv'), csvString)
      .then(() => {
        res.status(200);
        res.attachment(path.join(__dirname, 'converted.csv'));
        res.sendFile(path.join(__dirname, 'converted.csv'));
      })
      .catch(err => res.sendStatus(400));

    //Helper function to add lines for each object, depth-first
    function addLines(object) {
      let line = '';
      for (key in object) {
        if (key !== 'children') {
          line += `${object[key]},`
        }
      }
      line = line.slice(0, -1); //remove trailing comma
      line += '\n';
      csvString += line;
      object.children.forEach(child => {
        addLines(child);
      });
    }
  }
};