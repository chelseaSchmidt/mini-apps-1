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
            res.attachment(path.join(__dirname, 'converted.csv'));
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
};