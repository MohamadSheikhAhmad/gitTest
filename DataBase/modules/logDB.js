var mongoose = require("mongoose");

var rawSchema = mongoose.Schema({
  rule: String,
  rank: Number,
  message: String,
  date: Date,
});

var LogSchema = mongoose.Schema({
  file_name: String,
  userName: String,
  file_date: Date,
  process: [rawSchema],
});

module.exports = LogSchema;
