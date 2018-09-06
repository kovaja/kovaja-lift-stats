const Record = require('../../../database/schemas/record.schema');

const LIFTS = [1, 2, 3, 4];

module.exports = class LiftService {
  validateData(data) {
    if (data === null) {
      return '[API Lift error] Null data.';
    }

    if (data.hasOwnProperty('lift') === false) {
      return '[API Lift error] Property lift is missing.';
    }

    if (data.hasOwnProperty('guessId') === false) {
      return '[API Lift error] Property guessId is missing.';
    }

    if (typeof data['lift'] !== 'number' || isNaN(data['lift']) || LIFTS.indexOf(data['lift']) === -1) {
      return '[API Lift error] Property lift is not a correct lift. (' + data['lift'] + ')';
    }

    return null;
  };

  storeLift(guessId, lift) {
    const cb = (resolve, reject) => {
      const query = {_id: guessId};
      const partial = {lift: lift};

      Record.updateOne(query, partial, {}, (err) => {
        if (err) {
          reject(e);
          return;
        }

        resolve();
      });
    };

    return new Promise(cb)
  }

  setLift(data) {
    const validationError = this.validateData(data);

    if (validationError) {
      return Promise.reject(validationError);
    }

    return this.storeLift(data.guessId, data.lift);
  };
}