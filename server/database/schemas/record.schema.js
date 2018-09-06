var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new Schema({
    hour: Number,
    day: Number,
    floor: Number,
    direction: Number,
    guess: Number,
    lift: Number
});

module.exports = mongoose.model('Record', RecordSchema);