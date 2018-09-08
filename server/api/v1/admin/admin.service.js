const Record = require('../../../database/schemas/record.schema');
const RecordModel = require('../../../database/models/record.model');
const fs = require('fs');

const API_NAME = 'Admin';
const DATA_PATH = 'server/_data';
const EXPORT_DIR = '/output/';
const FILE_NAME = 'export';
const FILE_EXTENSION = '.json';

module.exports = class AdminService {
  clearCallback(criteria, resolve, reject, err, data) {
    err ? reject(err) : resolve(`[${API_NAME} API]: ${data.n} ${criteria} records deleted.`);
  }

  /**
   * CLEAR RECORDS WITHOUT GUESS
   */
  clearWithoutGuess() {
    const criteria = 'without guess';
    const query = { guess: null };

    return RecordModel.deleteMany(query)
      .then(number => `[${API_NAME} API]: ${number} ${criteria} records deleted.`);
  }

  /**
   * CLEAR RESULT WITH FAKE === TRUE
   */
  clearFakeRecords() {
    const criteria = 'fake';
    const query = { fake: true };

    return RecordModel.deleteMany(query)
      .then(number => `[${API_NAME} API]: ${number} ${criteria} records deleted.`);
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

        console.debug(`[${API_NAME} API]: Will write file with ${records.length} records to ${target}`);

        fs.writeFile(target, JSON.stringify(filteredRecords), {encoding: 'utf8'}, (err) => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }

          resolve(`[${API_NAME} API]: Data exporterd.`);
        });
      });
    };

    return new Promise(cb);
  }
};
