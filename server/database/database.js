var mongoose = require('mongoose');
const config = require('../secrets/config');

module.exports = class Database {
  initalize() {
    mongoose
      .connect(config.mongo.connectString, {
        useNewUrlParser: true
      })
      .then( () => console.debug('DB connected!'))
      .catch(err => console.error('DB connection failed', err));

  }
};