/**
 * Custom strategies to update record in database
 * @param record (record from database)
 * @returns record (updated record) | null no change for the record was done
 */

const MathCore = require('../../core/math.core');

const LIFTS = [1, 2, 3, 4];

const updateTimestamp = (record) => {
  const update = (resolve, reject) => {
    if (record.timestamp) {
      return resolve(null);
    }

    const now = new Date(); // 09.09.2018 0:43
    const friday = new Date(now.getTime() - 40 * 60 * 60 * 1000); // 40 hours

    record.timestamp = friday.getTime();

    return resolve(record);
  };

  return new Promise(update);
};

const fillInLift = (record) => {
  const update = (resolve, reject) => {
    if (record.lift) {
      return resolve(null);
    }

    record.lift = LIFTS[Math.floor(Math.random() * LIFTS.length)];
    return resolve(record);
  };

  return new Promise(update);
}

/**
 * record.results will be newly computed if there is not enough results
 * in the record
 */
const updateResults = (record) => {
  const update = (resolve, reject) => {
    if (record.results && record.results.length === LIFTS.length) {
      return resolve(null);
    }

    MathCore.computeResults(record)
      .then(results => {
        record.results = results
        return resolve(record);
      });
  };

  return new Promise(update);
}

/**
 * Apparently there was some mistake at some point and guess was -1 in all results
 * This ensures that guess is always maximum value from results + 1
 */
const recomputeGuess = (record) => {
  const update = (resolve, reject) => {
    record.guess = record.results.indexOf(Math.max(...record.results)) + 1,
    resolve(record);
  };

  return new Promise(update);
}

module.exports = {
  updateTimestamp: (r) => updateTimestamp(r),
  fillInLift: (r) => fillInLift(r),
  updateResults: (r) => updateResults(r),
  recomputeGuess: (r) => recomputeGuess(r)
};