const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Carmodel = new Schema({
  i_id: Schema.Types.ObjectId,
  model: {
    type: String
  }
});

module.exports = mongoose.model('Carmodel', Carmodel);
