const RecordModel = require('../../database/models/record.model');
const WieghtModel = require('../../database/models/weight.model');
const MathCore = require('../../core/math.core');

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

    fs.writeFile(target, JSON.stringify(filteredRecords), { encoding: 'utf8' }, (err) => {
      if (err) {
        throw err;
      }

      return `[${SERVICE_NAME}]: ${records.length} records exported.`;
    });
  }

  /**
   * EXPORTS NOT FAKE DATA IN THE DATABASE
   */
  exportRecords() {
    return RecordModel.readAll().then(this.writeRecordsToFile.bind(this));
  }

  // ugly code for one time data update
  // most likely could be improved
  customUpdate() {

    // STRATEGY
    const updateTimestamp = (record) => {
      if (record.timestamp) {
        return null;
      }

      const now = new Date(); // 09.09.2018 0:43
      const friday = new Date(now.getTime() - 40*60*60*1000); // 40 hours

      record.timestamp = friday.getTime();

      return record;
    };

    // STRATEGY
    const fillInLift = (record) => {
      if (record.lift) {
        return null;
      }

      record.lift = LIFTS[Math.floor(Math.random() * LIFTS.length)];
      return record;
    }

    return RecordModel.readAll().then(records => {
        let counter = 0;
        const promises = [];

        records.forEach((record) => {
          const updatedRecord = fillInLift(record)

          if (updatedRecord === null) {
            return;
          }

          counter++;
          promises.push(RecordModel.update(record._id, updatedRecord));
        });

        return Promise.all(promises).then(() => `[${SERVICE_NAME}]: ${counter} records updated.`);
    });
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

        const promises = records.map(r => MathCore.computeGuess(r));

        return Promise.all(promises).then(guesses => [records, guesses])
      })
      .then(data => {
        const guesses = data[1];
        const records = data[0];
        const results = records.map((r,i) => [r.lift, guesses[i], r.lift === guesses[i]]);

        console.debug('---------------try try try try try--------------');
        return results;
      })
      .then(results => `[${SERVICE_NAME}]: Weights Tried.` + '\n' + JSON.stringify(results) + '\n' + 'Succes: ' + results.filter(r  => r[2]).length + '/'  + results.length);
  }
};
