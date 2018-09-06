const Record = require('../../../database/schemas/record.schema');

const LIFTS = [1,2,3,4];

module.exports = class Guess {
  validateData(data) {
    if (data.hasOwnProperty('direction') === false) {
      return '[API Guess error] Property direction is missing.';
    }

    if (data.hasOwnProperty('floor') === false) {
      return '[API Guess error] Property floor is missing.';
    }

    if (data.hasOwnProperty('hour') === false) {
      return '[API Guess error] Property hour is missing.';
    }

    if (data.hasOwnProperty('day') === false) {
      return '[API Guess error] Property day is missing.';
    }

    // TODO: make sure its within 1 - 24
    if (typeof data['hour'] !== 'number' || isNaN(data['hour'])) {
      return '[API Guess error] Property hour is not a number.';
    }

    // TODO: make sure its within 1 - 7
    if (typeof data['day'] !== 'number' || isNaN(data['day'])) {
      return '[API Guess error] Property day is not a number.';
    }

    if (typeof data['direction'] !== 'number' || isNaN(data['direction'])) {
      return '[API Guess error] Property direction is not a number.';
    }

    if (typeof data['floor'] !== 'number' || isNaN(data['floor'])) {
      return '[API Guess error] Property floor is is not a number.';
    }

    return null;
  };

  storeGuess(data, guess) {
    const record = new Record({
      hour: data.hour,
      day: data.day,
      floor: data.floor,
      direction: data.direction,
      guess: guess,
      lift: null
    });

    record.save()
      .then((storeData) => {
        console.log('RECORD STORED', storeData);
      })
      .catch((e) => {
        console.error('Data not stored', e);
      });
  }

  computeGuess(data) {
    console.log('RIDE DATA: ', data);
    return  LIFTS[Math.floor(Math.random() * LIFTS.length)];
  };

  getGuess(data) {
    const guessPromise = (resolve, reject) => {
      const validationError = this.validateData(data);

      if (validationError) {
        reject(validationError);
        return;
      }

      const guess = this.computeGuess(data);
      this.storeGuess(data, guess)

      resolve({ guess: guess });
    };

    return new Promise(guessPromise)
  };
}