const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  user_name: { type: String, required: true, maxLength: 100 },
  time: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Score', ScoreSchema);
