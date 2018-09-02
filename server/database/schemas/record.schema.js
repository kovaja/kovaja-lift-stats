var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new Schema({
    time: Number,
    floor: Number,
    direction: Number,
    guess: Number,
    lift: Number
});

module.exports = mongoose.model('Record', RecordSchema);