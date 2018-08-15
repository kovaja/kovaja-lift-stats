const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;
const BUILD_PATH = path.join(__dirname, '../client/build');

app.use(express.static(BUILD_PATH));

app.get('/', function (req, res) {
  res.sendFile(BUILD_PATH+'/index.html');
});

app.listen(PORT, () => console.log('Lift-stat server listening on ' + PORT));