const RecordModel = require('../../database/models/record.model');

const LIFTS = [1, 2, 3, 4];
const isDevEnvironment = __dirname.indexOf('C:') !== -1;

module.exports = class RecordService {
  computeGuess(data) {
    console.debug('TODO use ride data to get guess: ', data);
    return LIFTS[Math.floor(Math.random() * LIFTS.length)];
  }

  createRecord(model) {
    const guess = this.computeGuess(model);

    const recordData = {
      timestamp: model.timestamp,
      hour: model.hour,
      day: model.day,
      floor: model.floor,
      direction: model.direction,
      guess: guess,
      lift: null,
      fake: isDevEnvironment
    };

    return RecordModel.create(recordData);
  }

  patchRecord(id, partialModel) {
    return RecordModel.update(id, partialModel);
  }

  readRecords() {
    const createResponseRecord = (record) => {
      return {
        timestamp: record.timestamp,
        hour: record.hour,
        day: record.day,
        floor: record.floor,
        direction: record.direction,
        guess: record.guess,
        lift: record.lift
      };
    };

    const processRecords = (records) => {
      return records.filter(r => isDevEnvironment || !r.fake).map(createResponseRecord);
    };

    return RecordModel.readAll().then(processRecords);
  }
};