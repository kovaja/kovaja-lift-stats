const Record = require('../schemas/record.schema');

const create = (data) => {
  return new Record(data).save();
};

const readAll = (resolve, reject) => {
  Record.find({}, (err, records) => err ? reject(err) : resolve(records));
}

const update = (id, data, resolve, reject) => {
  const query = { _id: id };

  Record.updateOne(query, data, {}, (err) => err ? reject(err) : resolve());
};

const deleteMany = (query, resolve, reject) => {
  Record.deleteMany(query, (err, data) => err ? reject(err): resolve(data.n));
};

/**
 * Promise lake wrapper over the Mongoose schema
 */
module.exports = {
  create: (data) => create(data),
  readAll: () => new Promise(readAll),
  update: (id, model) => new Promise(update.bind(this, id, model)),
  deleteMany: (query) => new Promise(deleteMany.bind(this, query))
};