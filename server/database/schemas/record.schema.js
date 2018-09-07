const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* eslint-disable indent */
var RecordSchema = new Schema({
    hour: Number,
    day: Number,
    floor: Number,
    direction: Number,
    guess: Number,
    lift: Number,
    fake: Boolean
});

module.exports = mongoose.model('Record', RecordSchema);