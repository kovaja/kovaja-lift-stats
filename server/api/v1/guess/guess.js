module.exports = class Guess {
  validateData(data) {
    if (data.hasOwnProperty('direction') === false) {
      return '[API Guess error] Property direction is missing.';
    }

    if (data.hasOwnProperty('floor') === false) {
      return'[API Guess error] Property floor is missing.';
    }

    if (data.hasOwnProperty('time') === false) {
      return '[API Guess error] Property time is missing.';
    }

    if ( typeof data['direction'] !== 'number' || isNaN(data['direction'])) {
      return '[API Guess error] Property direction is not a number.';
    }

    if ( typeof data['floor'] !== 'number' || isNaN(data['floor'])) {
      return '[API Guess error] Property floor is is not a number.';
    }

    // TODO: timestamp validation
    if ( typeof data['time'] !== 'number' || isNaN(data['time'])) {
      return '[API Guess error] Property time is is not a number.';
    }

    return null;
  };

  computeGuess(data) {
    return 123456;
  };

  getGuess(data) {
    const guessPromise = (resolve, reject) => {
        const validationError = this.validateData(data);

        if (validationError) {
          reject(validationError);
          return;
        }

        const guess = this.computeGuess(data);
        resolve({guess: guess});
    };

    return new Promise(guessPromise)
  };
}