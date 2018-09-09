const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* eslint-disable indent */
var WeightSchema = new Schema({
    lift: Number,
    dayWeight: Number,
    hourWeight: Number,
    floorWeight: Number,
    directionWeight: Number
});

module.exports = mongoose.model('Weight', WeightSchema);