const Record = require('../../../database/schemas/record.schema');

const LIFTS = [1, 2, 3, 4];

module.exports = class GuessService {
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

  computeGuess(data) {
    console.log('RIDE DATA: ', data);
    return LIFTS[Math.floor(Math.random() * LIFTS.length)];
  };

  getGuess(data) {
    const validationError = this.validateData(data);

    if (validationError) {
      return Promise.reject(validationError);
    }

    const guess = this.computeGuess(data);

    return this.storeGuess(data, guess)
      .then((storedGuess) => {
        return {
          guess: storedGuess.guess,
          guessId: storedGuess._id
        }
      });
  };
}