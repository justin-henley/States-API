const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
  // The two-char code for the state
  statecode: {
    type: String,
    required: true,
    unique: true,
  },
  // An array of fun facts about the state
  funfacts: {
    type: [String],
  },
});

module.exports = mongoose.model('State', stateSchema);
