const Record = require('../../../database/schemas/record.schema');

const LIFTS = [1, 2, 3, 4];
const API_NAME = 'Record';

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
  };

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
  };

  createRecordInDB(data, guess) {
    // TODO: make env files
    const isDevEnvironment = __dirname.indexOf('C:') !== -1;

    const recordData = {
      hour: data.hour,
      day: data.day,
      floor: data.floor,
      direction: data.direction,
      guess: guess,
      lift: null,
      fake: isDevEnvironment
    };

    return new Record(recordData).save();
  }

  updateRecordInDB(recordId, partialModel) {
    const cb = (resolve, reject) => {
      const query = { _id: recordId };

      Record.updateOne(query, partialModel, {}, (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    };

    return new Promise(cb)
  }

  computeGuess(data) {
    console.log('RIDE DATA: ', data);
    return LIFTS[Math.floor(Math.random() * LIFTS.length)];
  };

  createRecord(model) {
    const validationError = this.validateModelToCreate(model);

    if (validationError) {
      return Promise.reject(validationError);
    }

    const guess = this.computeGuess(model);

    return this.createRecordInDB(model, guess)
      .then((storedRecord) => {
        return {
          guess: storedRecord.guess,
          recordId: storedRecord._id
        }
      });
  };

  patchRecord(id, partialModel) {
    const validationError = this.validateDataToPatch(partialModel);

    if (validationError) {
      return Promise.reject(validationError);
    }

    return this.updateRecordInDB(id, partialModel);
  }

  readRecords() {
    const cb = (resolve, reject) => {
      Record.find({}, (err, records) => {
        console.log(records);
        if (err) {
          reject(err);
          return;
        }

        const filteredRecords = records
          .filter(r => !r.fake)
          .map(r => {
            return {
              hour: r.hour,
              day: r.day,
              floor: r.floor,
              direction: r.direction,
              guess: r.guess,
              lift: r.lift
            }
          });

        resolve(filteredRecords);
      });
    };

    return new Promise(cb);
  }
}