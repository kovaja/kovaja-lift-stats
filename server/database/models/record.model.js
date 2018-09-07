const Record = require('../schemas/record.schema');

const readAll = (resolve, reject) => {
  Record.find({}, (err, records) => err ? reject(err) : resolve(records));
}

const create = (data) => {
  return new Record(data).save();
};

const update = (id, data, resolve, reject) => {
  const query = { _id: id };

  Record.updateOne(query, data, {}, (err) => err ? reject(err) : resolve());
};

/**
 * Promise lake wrapper over the Mongoose schema
 */
module.exports = {
  readAll: () => new Promise(readAll),
  create: (data) => create(data),
  update: (id, model) => new Promise(update.bind(this, id, model))
};