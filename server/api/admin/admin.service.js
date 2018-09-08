const RecordModel = require('../../database/models/record.model');
const fs = require('fs');

const SERVICE_NAME = 'Admin';
const DATA_PATH = 'server/_data';
const EXPORT_DIR = '/output/';
const FILE_NAME = 'export';
const FILE_EXTENSION = '.json';

module.exports = class AdminService {
  getClearQuery(key) {
    switch (key) {

    case 'fake':
      return { fake: true };
    case 'guess':
      return { guess: null };
    default:
      return {};

    }
  }

  clear(key) {
    const query = this.getClearQuery(key);

    return RecordModel.deleteMany(query)
      .then(number => `[${SERVICE_NAME}]: ${number} records deleted. Query: ${JSON.stringify(query)}`);
  }

  writeRecordsToFile(records) {
    const filteredRecords = records.filter(r => !r.fake);
    const timestampString = '-' + new Date().toDateString().split(' ').join('-');
    const target = DATA_PATH + EXPORT_DIR + FILE_NAME + timestampString + FILE_EXTENSION;

    console.debug(`[${SERVICE_NAME}]: Will write file with ${records.length} records to ${target}`);

    fs.writeFile(target, JSON.stringify(filteredRecords), { encoding: 'utf8' }, (err) => {
      if (err) {
        throw err;
      }

      return `[${SERVICE_NAME}]: ${records.length} records exported.`;
    });
  }

  /**
   * EXPORTS NOT FAKE DATA IN THE DATABASE
   */
  exportRecords() {
    return RecordModel.readAll().then(this.writeRecordsToFile.bind(this));
  }

  // ugly code for one time data update
  // most likely could be improved
  customUpdate() {

    // STRATEGY
    const updateTimestamp = (record) => {
      if (record.timestamp) {
        return null;
      }

      const now = new Date(); // 09.09.2018 0:43
      const friday = new Date(now.getTime() - 40*60*60*1000); // 40 hours

      record.timestamp = friday.getTime();

      return record;
    };

    return RecordModel.readAll().then(records => {
        let counter = 0;
        const promises = [];

        records.forEach((record) => {
          const updatedRecord = updateTimestamp(record)

          if (updatedRecord === null) {
            return;
          }

          counter++;
          promises.push(RecordModel.update(record._id, updatedRecord));
        });

        return Promise.all(promises).then(() => `[${SERVICE_NAME}]: ${counter} records updated.`);
    });
  }
};
