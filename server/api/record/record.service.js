const RecordModel = require('../../database/models/record.model');
const MathCore = require('../../core/math.core');
const isDevEnvironment = __dirname.indexOf('C:') !== -1;

module.exports = class RecordService {
  createRecordObject(model, guess) {
    return {
      timestamp: model.timestamp,
      hour: model.hour,
      day: model.day,
      floor: model.floor,
      direction: model.direction,
      guess: guess,
      lift: null,
      fake: isDevEnvironment
    };
  }

  createRecord(model) {
    return MathCore
      .computeGuess(model)
      .then((guess) => RecordModel.create(this.createRecordObject(model, guess)));
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