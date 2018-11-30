const RecordService = require('../record/record.service');
const RecordModel = require('../../database/models/record.model');
const WieghtModel = require('../../database/models/weight.model');
const MathCore = require('../../core/math.core');
const UpdateStrategy = require('./update-strategies');

const fs = require('fs');

const SERVICE_NAME = 'Admin';
const DATA_PATH = 'server/_data';
const EXPORT_DIR = '/output/';
const RECORDS_FILE_NAME = 'export_records';
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

  clearData(key) {
    const query = this.getClearQuery(key);

    return RecordModel.deleteMany(query)
      .then(number => `[${SERVICE_NAME}]: ${number} records deleted. Query: ${JSON.stringify(query)}`);
  }

  getRealRecords(records) {
    return records.filter(r => !r.fake);
  }

  getfilePath(filname) {
    const timestampString = '-' + new Date().toDateString().split(' ').join('-');
    return DATA_PATH + EXPORT_DIR + filname + timestampString + FILE_EXTENSION;
  }

  writeFile(arrayOfData, filename) {
    const target = this.getfilePath(filename);

    console.debug(`[${SERVICE_NAME}]: Will write file with ${arrayOfData.length} records to ${target}`);

    fs.writeFileSync(target, JSON.stringify(arrayOfData), { encoding: 'utf8' });

    return arrayOfData.length;
  }

  writeRecordsToFile(records) {
    const filteredRecords = this.getRealRecords(records);
    return this.writeFile(filteredRecords, RECORDS_FILE_NAME);
  }

  /**
   * EXPORTS NOT FAKE DATA THAT ARE STORED IN THE DATABASE
   */
  exportRecords() {
    return RecordModel.readAll()
      .then(records => this.writeRecordsToFile(records))
      .then(number => `[${SERVICE_NAME}]: ${number} records exported.`);
  }

  /**
   * EXPORTS REAL INPUTS SO IT CAN BE RELOADED
   */
  exportInputs() {
    return RecordModel.readAll()
      .then(records => this.writeInputsToFile(records))
      .then(number => `[${SERVICE_NAME}]: ${number} records exported.`);
  }

  // ugly code for one time data update
  // most likely could be improved
  customUpdate() {
    // const strategy = UpdateStrategy.fillInLift;
    // const strategy = UpdateStrategy.updateTimestamp;
    // const strategy = UpdateStrategy.updateResults;
    const strategy = UpdateStrategy.recomputeGuess;

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
      });
  }

  retrain(records) {
    const recordService = new RecordService();

    return WieghtModel.readAll()
      .then(allWeights => {
        const promises = records.map((record) => {
          const results = MathCore.computeResults(record, allWeights);

          const updatedRecord = Object.assign({}, record);

          updatedRecord.results = results;
          updatedRecord.guess = results.indexOf(Math.max(...results)) + 1;
          delete updatedRecord._id;

          return recordService.patchRecord(record._id, updatedRecord);
        });

        return Promise.all(promises);
      });
  }

  computeCost() {
      return RecordModel.readAll()
        .then(records => {
          const costsForEveryRecord = records.map(r => MathCore.computeCost(r));
          const costs = costsForEveryRecord.map(c => MathCore.sumUpArray(c));
          const average = MathCore.sumUpArray(costs) / records.length

          return `For ${records.length} records the average cost is ${average}`;
        });
  }
};
