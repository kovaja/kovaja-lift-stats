const Record = require('../../../database/schemas/record.schema');
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
    const cb = (resolve, reject) => {
      const query = { guess: null };

      Record.deleteMany(query, this.clearCallback.bind(this, 'without guess', resolve, reject));
    };

    return new Promise(cb);
  }

  /**
   * CLEAR RESULT WITH FAKE === TRUE
   */
  clearFakeRecords() {
    const cb = (resolve, reject) => {
      const query = { fake: true };
      Record.deleteMany(query, this.clearCallback.bind(this, 'fake', resolve, reject));
    };

    return new Promise(cb);
  }

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
