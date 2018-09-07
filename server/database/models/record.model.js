const Record = require('../schemas/record.schema');

const readAll = (resolve, reject) => {
  Record.find({}, (err, records) => err ? reject(err) : resolve(records));
}

const update = (id, data, resolve, reject) => {
  const query = { _id: id };

  Record.updateOne(query, data, {}, (err) => err ? reject(err) : resolve());
};

module.exports = {
  readAll: () => new Promise(readAll),
  update: (id, model) => new Promise(update.bind(this, id, model))
};