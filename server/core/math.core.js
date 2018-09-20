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

const getModelAsVector = (model) => {
  const vector = [model.day, model.hour, model.floor, model.direction];

  console.debug('-- > Normalize:');

  // const normalized = simpleNormalize(vector);
  const normalized = minMaxNormalize(vector);
  console.debug(vector, '~~~>', normalized);

  return normalized;
};

const getWeightsAsMatrix = (weights) => {
  return weights.map(weightModel => {
    return [
      weightModel.dayWeight,
      weightModel.hourWeight,
      weightModel.floorWeight,
      weightModel.directionWeight,
    ];
  });
};

const sumUpArray = (array) => {
  return array.reduce((sum, current) => sum + current, 0);
};

const computeSingleLiftGuess = (row, vector) => {
  const weightedVector =  row.map((weight,i) => (weight*vector[i])/vector.length);

  console.debug('-- >weighted vector', weightedVector);
  return sumUpArray(weightedVector);
};

const getGuesses = (matrix, vector) => {
  return matrix.map(row => computeSingleLiftGuess(row, vector));
}

const computeGuesses = (record) => {
  const vector = getModelAsVector(record);
  console.debug('\n-- >vector:', vector);

  return WeightModel.readAll()
    .then(getWeightsAsMatrix)
    .then(matrix => getGuesses(matrix, vector))
    .then(guesses => {
      console.debug('-- >all guesses:\n', guesses);
      return guesses;
    })
    .then(guess => {
      console.debug('-- >guess:', guess);
      return guess;
    });
};

module.exports = {
  computeGuesses: (record) => computeGuesses(record)
};