var mongoose = require("mongoose");

var LogSchema = mongoose.Schema({
  userName: String,
  fileName: String,
  fileDate: Date,
  process: [
    {
      rules: String,
      rank: String,
      message: String,
      date: Date,
    },
  ],
});
module.exports = LogSchema;
