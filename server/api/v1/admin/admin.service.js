const Record = require('../../../database/schemas/record.schema');
const API_NAME = 'Admin';

module.exports = class AdminService {
  clearFakeRecords() {
    const cb = (resolve, reject) => {
      const query = { fake: true };

      Record.deleteMany(query, (err) => {
        if(err) {
          reject(err);
          return;
        }

        resolve(`[${API_NAME} API]: Fake records deleted.`);
      });
    };

    return new Promise(cb);
  }
}
