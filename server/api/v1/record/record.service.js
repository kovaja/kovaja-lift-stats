const RecordModel = require('../../../database/models/record.model');

const LIFTS = [1, 2, 3, 4];
const API_NAME = 'Record';

const isDevEnvironment = __dirname.indexOf('C:') !== -1;

module.exports = class RecordService {
  validateModelToCreate(data) {
    if (data === null) {
      return '[API ' + API_NAME + ' error] Null data.';
    }

    if (data.hasOwnProperty('direction') === false) {
      return '[API ' + API_NAME + ' error] Property direction is missing.';
    }

    if (data.hasOwnProperty('floor') === false) {
      return '[API ' + API_NAME + ' error] Property floor is missing.';
    }

    if (data.hasOwnProperty('hour') === false) {
      return '[API ' + API_NAME + ' error] Property hour is missing.';
    }

    if (data.hasOwnProperty('day') === false) {
      return '[API ' + API_NAME + ' error] Property day is missing.';
    }

    // TODO: make sure its within 1 - 24
    if (typeof data['hour'] !== 'number' || isNaN(data['hour'])) {
      return '[API ' + API_NAME + ' error] Property hour is not a number.';
    }

    // TODO: make sure its within 1 - 7
    if (typeof data['day'] !== 'number' || isNaN(data['day'])) {
      return '[API ' + API_NAME + ' error] Property day is not a number.';
    }

    if (typeof data['direction'] !== 'number' || isNaN(data['direction'])) {
      return '[API ' + API_NAME + ' error] Property direction is not a number.';
    }

    if (typeof data['floor'] !== 'number' || isNaN(data['floor'])) {
      return '[API ' + API_NAME + ' error] Property floor is is not a number.';
    }

    return null;
  }

  validateDataToPatch(data) {
    if (data === null) {
      return '[API ' + API_NAME + ' error] Null data.';
    }

    if (data.hasOwnProperty('lift') === false) {
      return '[API ' + API_NAME + ' error] Property lift is missing.';
    }

    if (typeof data['lift'] !== 'number' || isNaN(data['lift']) || LIFTS.indexOf(data['lift']) === -1) {
      return '[API ' + API_NAME + ' error] Property lift is not a correct lift. (' + data['lift'] + ')';
    }

    return null;
  }

  computeGuess(data) {
    console.debug('RIDE DATA: ', data);
    return LIFTS[Math.floor(Math.random() * LIFTS.length)];
  }

  createRecord(model) {
    const validationError = this.validateModelToCreate(model);

    if (validationError) {
      return Promise.reject(validationError);
    }

    const guess = this.computeGuess(model);

    const recordData = {
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
    const validationError = this.validateDataToPatch(partialModel);

    if (validationError) {
      return Promise.reject(validationError);
    }

    return RecordModel.update(id, partialModel);
  }

  readRecords() {
    const createResponseRecord = (record) => {
      return {
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