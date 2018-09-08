const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bodyParserJson = bodyParser.json();
const app = express();

const PORT = process.env.PORT || 8000;
const BUILD_PATH = path.join(__dirname, 'assets');

const Api = require('./api/api');
const router = Api.initalizeRouter(express);

const Database = require('./database/database');
const database = new Database();
database.initalize();

const serveIndex = (req, res) => {
  res.sendFile(BUILD_PATH + '/index.html');
};

app.use(express.static(BUILD_PATH));
app.use(bodyParserJson);
app.use('/api', router);
app.get('/*', serveIndex);
app.listen(PORT, () => console.debug('Lift-stat server listening on ' + PORT));