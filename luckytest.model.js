const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Score = new Schema({
    name: {
        type: String
    },
    turn: {
        type: Number
    },
    rating: {
        type: String
    }
});

module.exports = mongoose.model('luckytest', Score);