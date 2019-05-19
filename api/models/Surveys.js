const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Surveys = new Schema({
    age: {
    type: Number
  },
  gender: {
    type: String
  },
  license: {
    type: String
  },
  first_car: {
    type: String
  },
  drivetrain: {
    type: String
  },
  drifting: {
    type: String
  },
  how_many: {
    type: Number
  }
},{
    collection: 'Surveys'
});


module.exports = mongoose.model('Surveys', Surveys);