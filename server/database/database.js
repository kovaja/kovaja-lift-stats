var mongoose = require('mongoose');
const config = require('../secrets/config');

 const useDB = true;
 // const useDB = false;

module.exports = class Database {
  initalize() {
    if (useDB === false) {
      console.log('NOT USING DATABASE');
      return;
    }
    mongoose
      .connect(config.mongo.connectString, {
        useNewUrlParser: true
      })
      .then( () => console.log('DB connected!'))
      .catch(err => console.error('DB connection failed', err));

  }
}