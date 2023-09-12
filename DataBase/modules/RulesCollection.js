var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/dataBase");

var RulesSchema = mongoose.Schema({
  userName: String,
  ruleName: String,
  keywords: ["", ""],
});

module.exports = RulesSchema;
