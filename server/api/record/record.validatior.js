const API_NAME = 'record';

const validateModelToCreate = (data) => {
  if (data === null) {
    return '[API ' + API_NAME + ' error] Null data.';
  }

  if (data.hasOwnProperty('direction') === false) {
    return '[API ' + API_NAME + ' error] Property direction is missing.';
  }

  if (data.hasOwnProperty('floor') === false) {
    return '[API ' + API_NAME + ' error] Property floor is missing.';
  }

  if (data.hasOwnProperty('hour') === false) {
    return '[API ' + API_NAME + ' error] Property hour is missing.';
  }

  if (data.hasOwnProperty('day') === false) {
    return '[API ' + API_NAME + ' error] Property day is missing.';
  }

  // TODO: make sure its within 1 - 24
  if (typeof data['hour'] !== 'number' || isNaN(data['hour'])) {
    return '[API ' + API_NAME + ' error] Property hour is not a number.';
  }

  // TODO: make sure its within 1 - 7
  if (typeof data['day'] !== 'number' || isNaN(data['day'])) {
    return '[API ' + API_NAME + ' error] Property day is not a number.';
  }

  if (typeof data['direction'] !== 'number' || isNaN(data['direction'])) {
    return '[API ' + API_NAME + ' error] Property direction is not a number.';
  }

  if (typeof data['floor'] !== 'number' || isNaN(data['floor'])) {
    return '[API ' + API_NAME + ' error] Property floor is is not a number.';
  }

  return null;
}

const LIFTS = [1, 2, 3, 4];

const validateDataToPatch = (data) => {
  if (data === null) {
    return '[API ' + API_NAME + ' error] Null data.';
  }

  if (data.hasOwnProperty('lift') === false) {
    return '[API ' + API_NAME + ' error] Property lift is missing.';
  }

  if (typeof data['lift'] !== 'number' || isNaN(data['lift']) || LIFTS.indexOf(data['lift']) === -1) {
    return '[API ' + API_NAME + ' error] Property lift is not a correct lift. (' + data['lift'] + ')';
  }

  return null;
}

module.exports = {
  validateCreatePayload: validateModelToCreate,
  validatePatchPayload: validateDataToPatch
};