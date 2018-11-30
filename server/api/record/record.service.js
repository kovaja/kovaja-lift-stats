const WeightModel = require('../../database/models/weight.model');
const RecordModel = require('../../database/models/record.model');
const MathCore = require('../../core/math.core');
const isDevEnvironment = __dirname.indexOf('C:') !== -1;

module.exports = class RecordService {
  createRecordObject(model, results) {
    return {
      timestamp: model.timestamp,
      hour: model.hour,
      day: model.day,
      floor: model.floor,
      direction: model.direction,
      results: results,
      guess: MathCore.getGuess(results),
      lift: null,
      fake: isDevEnvironment
    };
  }

  createRecord(model) {
    return WeightModel.readAll()
      .then(allWeights => MathCore.computeResults(model, allWeights))
      .then(guessResults => this.createRecordObject(model, guessResults))
      .then(recordObject => RecordModel.create(recordObject));
  }

  updateWeights(results, lift) {
    const cost = MathCore.computeCost(results, lift);
    console.log('Cost is', MathCore.sumUpArray(cost));
  }

  patchRecord(id, partialModel) {
    return RecordModel.update(id, partialModel)
      .then(recordToUpdate => this.updateWeights(recordToUpdate.results, partialModel.lift));
  }

  readRecords() {
    const createResponseRecord = (record) => {
      return {
        timestamp: record.timestamp,
        hour: record.hour,
        day: record.day,
        floor: record.floor,
        direction: record.direction,
        results: record.results,
        guess: record.guess,
        lift: record.lift,
        fake: record.fake
      };
    };

    const processRecords = (records) => {
      return records.filter(r => isDevEnvironment || !r.fake).map(createResponseRecord);
    };

    return RecordModel.readAll().then(processRecords);
  }
};