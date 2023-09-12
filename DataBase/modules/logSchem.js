var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/dataBase");

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
