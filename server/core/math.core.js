const WeightModel = require('../database/models/weight.model');

const LIFTS = [1, 2, 3, 4];
const SCALES = [
  [1,2,3,4,5,6],
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
  [1,3,4,7,14],
  [-1,1]
];

const simpleNormalize = (vector) => {
  const avg = sumUpArray(vector)/vector.length;
  const withZeroMean = vector.map(v => v-avg);

  return withZeroMean; // divide by "smerodatna odchylka"
}

const minMaxNormalize = (vector) => {
  const minMaxNormalized = vector.map( (v,i) => {
    const s = SCALES[i];
    const maxS = Math.max(...s);
    const minS = Math.min(...s);

    return ((v - minS)/(maxS - minS));
  });

  return minMaxNormalized;
};

const getResultVector = (model) => {
  const vector = [model.day, model.hour, model.floor, model.direction];
  // const normalized = simpleNormalize(vector);
  const normalized = minMaxNormalize(vector);

  // console.debug(vector, '~~~>', normalized);
  return normalized;
};

const getWeightsAsMatrix = (allWeights) => {
  return allWeights.map(weightOfLift => {
    return [
      weightOfLift.dayWeight,
      weightOfLift.hourWeight,
      weightOfLift.floorWeight,
      weightOfLift.directionWeight,
    ];
  });
};

const sumUpArray = (array) => {
  return array.reduce((sum, current) => sum + current, 0);
};

const computeSingleLiftGuess = (row, vector) => {
  const weightedVector =  row.map((weight,i) => {
    // console.log('Weight', i, ':', weight);
    // console.log('Vector value on index', i, ':', vector[i]);
    // console.log('Weight times vector', weight*vector[i])

    return (weight*vector[i])/1; //vector.length
  });

  // console.debug('-- >weighted vector', weightedVector);
  return sumUpArray(weightedVector);
};

const multiplyMatrixByVector = (matrix, vector) => {
  const resultsForAllLifts = matrix.map(row => computeSingleLiftGuess(row, vector));
  // console.debug('-- >all results', resultsForAllLifts);
  return resultsForAllLifts;
}

const computeResults = (record) => {
  const vector = getResultVector(record);

  return WeightModel.readAll()
    .then(getWeightsAsMatrix)
    .then(matrix => multiplyMatrixByVector(matrix, vector));
};

module.exports = {
  computeResults: (record) => computeResults(record)
};