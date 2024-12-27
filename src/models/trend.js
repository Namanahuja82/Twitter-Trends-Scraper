const mongoose = require('mongoose');

const trendSchema = new mongoose.Schema({
  uniqueId: String,
  nameoftrend1: String,
  nameoftrend2: String,
  nameoftrend3: String,
  nameoftrend4: String,
  nameoftrend5: String,
  timestamp: Date,
  ipAddress: String
});

module.exports = mongoose.model('Trend', trendSchema);