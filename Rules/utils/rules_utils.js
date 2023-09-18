var RulesSchema = require("../../DataBase/modules/RulesCollection");
const rulesArray = require("../analyzation/rules");
const { getMongooseConnection } = require("../../DataBase/DBmongoose");
const { getAllRules } = require("../../Routes/Service/rulesService.js");

async function getRules(databaseName, callback) {
  try {
    const rules = await getAllRules(databaseName);
    callback(null, rules);
  } catch (error) {
    callback(err, null);
  }
}

async function getRulesByName(ruleNames, databaseName) {
  try {
    const connecting = await getMongooseConnection(databaseName);
    const File = connecting.model("rulescollections", RulesSchema);
    const result = await File.find(
      { ruleName: { $in: rules } },
      { _id: 0, __v: 0, userName: 0 }
    );
    return result;
  } catch (error) {
    return error;
  }
}

function addRule() {
  Rule.insertMany(rulesArray);
}

module.exports = {
  getRules,
  getRulesByName,
  addRule,
};
