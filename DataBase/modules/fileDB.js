var mongoose = require("mongoose");
//const connection = mongoose.connect('mongodb://127.0.0.1:27017/logAnalyzer');

var fileSchema = mongoose.Schema({
  date: Date,
  info: String,
});

// var Rule = mongoose.model("Rule", ruleSchema, 'rules');

module.exports = { fileSchema };
