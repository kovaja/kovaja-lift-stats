const RecordModel = require('../../database/models/record.model');
const WieghtModel = require('../../database/models/weight.model');
const MathCore = require('../../core/math.core');
const UpdateStrategy = require('./update-strategies');

const fs = require('fs');

const SERVICE_NAME = 'Admin';
const DATA_PATH = 'server/_data';
const EXPORT_DIR = '/output/';
const FILE_NAME = 'export';
const FILE_EXTENSION = '.json';

const LIFTS = [1, 2, 3, 4];

module.exports = class AdminService {
  getClearQuery(key) {
    switch (key) {

      case 'fake':
        return { fake: true };
      case 'guess':
        return { guess: null };
      case 'lift':
        return { lift: null };
      default:
        return {};

    }
  }

  clear(key) {
    const query = this.getClearQuery(key);

    return RecordModel.deleteMany(query)
      .then(number => `[${SERVICE_NAME}]: ${number} records deleted. Query: ${JSON.stringify(query)}`);
  }

  writeRecordsToFile(records) {
    const filteredRecords = records.filter(r => !r.fake);
    const timestampString = '-' + new Date().toDateString().split(' ').join('-');
    const target = DATA_PATH + EXPORT_DIR + FILE_NAME + timestampString + FILE_EXTENSION;

    console.debug(`[${SERVICE_NAME}]: Will write file with ${records.length} records to ${target}`);

    fs.writeFileSync(target, JSON.stringify(filteredRecords), { encoding: 'utf8' });
    return records.length;
  }

  /**
   * EXPORTS NOT FAKE DATA IN THE DATABASE
   */
  exportRecords() {
    return RecordModel.readAll()
      .then(records => this.writeRecordsToFile(records))
      .then(number => `[${SERVICE_NAME}]: ${number} records exported.`);
  }

  // ugly code for one time data update
  // most likely could be improved
  customUpdate() {
    //const strategy = UpdateStrategy.fillInLift;
    //const strategy = UpdateStrategy.updateTimestamp;
    const strategy = UpdateStrategy.updateResults;

    const updateAllRecords = (records) => {
      const promises = records.map(r => strategy(r));

      return Promise.all(promises)
    };

    const processUpdatedRecords = (records) => {
      return records.filter(r => r !== null);
    };

    const updateRecordModels = (updatedRecords) => {
      let counter = 0;
      const promises = [];


      updatedRecords.forEach((updatedRecord) => {
        if (updatedRecord === null) {
          return;
        }

        counter++;
        promises.push(RecordModel.update(updatedRecord._id, updatedRecord));
      });

      return Promise.all(promises).then(() => counter);
    };

    return RecordModel.readAll()
      .then(updateAllRecords)
      .then(processUpdatedRecords)
      .then(updateRecordModels)
      .then((number) => `[${SERVICE_NAME}]: ${number} records updated.`);
  }

  getInitWeights() {
    const randWeight = () => {
      return Math.floor(Math.random() * 100) / 100;
    }

    const w = [
      [randWeight(), randWeight(), randWeight(), randWeight()],
      [randWeight(), randWeight(), randWeight(), randWeight()],
      [randWeight(), randWeight(), randWeight(), randWeight()],
      [randWeight(), randWeight(), randWeight(), randWeight()]
    ]

    return w;
  }

  createSingleWeight(lift, i, weights) {
    const weightData = {
      lift: lift,
      dayWeight: weights[i][0],
      hourWeight: weights[i][1],
      floorWeight: weights[i][2],
      directionWeight: weights[i][3]
    };

    return WieghtModel.create(weightData);
  }

  initializeWeights() {
    return WieghtModel.deleteMany({})
      .then((n) => console.debug(n + ' weights removed'))
      .then(() => {
        const weights = this.getInitWeights();
        const promises = LIFTS.map((lift, i) => this.createSingleWeight(lift, i, weights));

        console.debug(weights);

        return Promise.all(promises).then(() => weights);
      })

  }

  tryWeights() {
    return RecordModel.readAll()
      .then(records => {
        console.debug('---------------try try try try try--------------');

        const promises = records.map(r => MathCore.computeResults(r));

        return Promise.all(promises).then(guesses => [records, guesses])
      })
      .then(data => {
        const guesses = data[1];
        const records = data[0];

        const computeGuessedLift = (i) => guesses[i].indexOf(Math.max(...guesses[i])) + 1;

        const results = records.map((r, i) => {
          const guessedLift = computeGuessedLift(i);

          return [r.lift, guessedLift, r.lift === guessedLift]
        });

        console.debug('---------------try try try try try--------------');
        return results;
      })
      .then(results => `[${SERVICE_NAME}]: Weights Tried. [lift, guess, success]` + '\n' + JSON.stringify(results) + '\n' + 'Succes: ' + results.filter(r => r[2]).length + '/' + results.length);
  }
};
