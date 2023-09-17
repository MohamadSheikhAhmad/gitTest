var mongoose = require("mongoose");

var RulesSchema = mongoose.Schema({
  userName: String,
  ruleName: String,
  keywords: ["", ""],
});

module.exports = RulesSchema;
