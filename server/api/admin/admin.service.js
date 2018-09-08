const Record = require('../../database/schemas/record.schema');
const RecordModel = require('../../database/models/record.model');
const fs = require('fs');

const SERVICE_NAME = 'Admin';
const DATA_PATH = 'server/_data';
const EXPORT_DIR = '/output/';
const FILE_NAME = 'export';
const FILE_EXTENSION = '.json';

module.exports = class AdminService {
  getClearQuery(key) {
    switch(key) {
      case 'fake':
        return {fake: true};
      case 'guess':
        return {guess: null};
      default:
        return {};
    }
  }

  clear(key) {
    const query = this.getClearQuery(key);

    return RecordModel.deleteMany(query)
      .then(number => `[${SERVICE_NAME}]: ${number} records deleted. Query: ${JSON.stringify(query)}`);
  }

  /**
   * EXPORTS NOT FAKE DATA IN THE DATABASE
   */
  exportRecords() {
    const cb = (resolve, reject) => {

      Record.find({}, (err, records) => {
        if (err) {
          reject(err);
          return;
        }

        const filteredRecords = records.filter(r => !r.fake);
        const timestampString = '-' + new Date().toDateString().split(' ').join('-');
        const target = DATA_PATH + EXPORT_DIR + FILE_NAME + timestampString + FILE_EXTENSION;

        console.debug(`[${SERVICE_NAME}]: Will write file with ${records.length} records to ${target}`);

        fs.writeFile(target, JSON.stringify(filteredRecords), {encoding: 'utf8'}, (err) => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }

          resolve(`[${SERVICE_NAME}]: ${records.length} records exported.`);
        });
      });
    };

    return new Promise(cb);
  }
};
