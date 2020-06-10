const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'checkout'
});

connection.connect();

module.exports = connection;