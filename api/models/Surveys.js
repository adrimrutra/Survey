const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Surveys = new Schema({
  i_id: Schema.Types.ObjectId,
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
  },
  carmodels: [{type: String}]
});

module.exports = mongoose.model('Surveys', Surveys);