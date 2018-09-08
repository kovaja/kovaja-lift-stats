const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* eslint-disable indent */
var RecordSchema = new Schema({
    timestamp: Number,
    hour: Number,
    day: Number,
    floor: Number,
    direction: Number,
    guess: Number,
    lift: Number,
    fake: Boolean
});

module.exports = mongoose.model('Record', RecordSchema);