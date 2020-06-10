const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});