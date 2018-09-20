const RecordModel = require('../../database/models/record.model');
const MathCore = require('../../core/math.core');
const isDevEnvironment = __dirname.indexOf('C:') !== -1;

module.exports = class RecordService {
  createRecordObject(model, guesses) {
    return {
      timestamp: model.timestamp,
      hour: model.hour,
      day: model.day,
      floor: model.floor,
      direction: model.direction,
      guess: guesses.indexOf(Math.max(...guesses)) + 1,
      results: guesses,
      lift: null,
      fake: isDevEnvironment
    };
  }

  createRecord(model) {
    return MathCore
      .computeGuesses(model)
      .then((guesses) => RecordModel.create(this.createRecordObject(model, guesses)));
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