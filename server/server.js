const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bodyParserJson = bodyParser.json();
const app = express();

const PORT = 8000;
const BUILD_PATH = path.join(__dirname, '../client/build');

const Api = require('./api/api');
const api = new Api();
const router = api.initalizeRouter(express);

const serveIndex = (req, res) => {
  res.sendFile(BUILD_PATH + '/index.html');
};

app.use(express.static(BUILD_PATH));
app.use(bodyParserJson);
app.use('/api', router);
app.get('/', serveIndex);
app.listen(PORT, () => console.log('Lift-stat server listening on ' + PORT));