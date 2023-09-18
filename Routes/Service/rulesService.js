const { getMongooseConnection } = require("../../DataBase/DBmongoose");
/**
 *
 * @param {*} databaseName
 * @returns all rules in the database
 *
 */
async function getAllRules(databaseName) {
  try {
    const conn = await getDatabaseConnection(databaseName);

    const result = await conn.RulesCollection.find(
      {},
      { _id: 0, __v: 0, userName: 0 }
    );
    return result;
  } catch (error) {
    console.log("Error in get all rules", error);
    return "error";
  }
}

async function getRulesByName(rules, databaseName) {
  try {
    const connecting = await getMongooseConnection(databaseName);
    //const File = connecting.model("rulescollections", RulesSchema);

    const result = await connecting.RulesCollection.find(
      { ruleName: { $in: rules } },
      { _id: 0, __v: 0, userName: 0 }
    );
    return result;
  } catch (error) {
    return error;
  }
}
async function createNewRule(databaseName, req) {
  try {
    const connection = await getDatabaseConnection(databaseName);
    const check = await connection.RulesCollection.findOne({
      ruleName: req.body.ruleName,
    });
    if (check) {
      return "rule already exists";
    } else {
      var newRule = req.body;
      newRule.userName = req.user.userName;

      const result = await connection.RulesCollection.create(newRule);
      return result;
    }
  } catch (error) {
    console.log("Error in creating the rule", error);
  }
}

async function deleteExistedRule(databaseName, req) {
  try {
    const connection = await getDatabaseConnection(databaseName);

    const ruleExists = await connection.RulesCollection.findOne({
      ruleName: req.params.ruleName,
    });

    if (!ruleExists) return "rule dose not exists!";
    else {
      if (
        ruleExists.userName === req.user.userName ||
        req.user.role === "admin"
      ) {
        const deletedRule = await connection.RulesCollection.findOneAndRemove({
          ruleName: req.params.ruleName,
        });
        return "Deleted Successfully";
      } else {
        return "not authorized";
      }
    }
  } catch (error) {
    //console.log("Error in deleting rule", error);
    return "Error not able to delete the rule   ";
  }
}

async function updateRule(databaseName, req) {
  try {
    const connection = await getDatabaseConnection(databaseName);
    const rulename = req.body.ruleName;
    console.log(rulename);
    const ruleExists = await connection.RulesCollection.findOne({
      ruleName: rulename,
    });

    console.log(ruleExists);
    if (!ruleExists) return "rule dose not exists!";
    else {
      if (
        req.body.userName === req.user.userName ||
        req.user.role === "admin"
      ) {
        for (let elem in req.body) {
          ruleExists[elem] = req.body[elem];
        }

        const result = await ruleExists.save();

        return result;
      } else {
        return "not authorized";
      }
    }
  } catch (error) {
    console.log("Error in updating rule", error);
  }
}

async function getDatabaseConnection(databaseName) {
  try {
    const connection = getMongooseConnection(databaseName);
    return connection;
  } catch (error) {
    console.log("Error in connecting to database ", error);
  }
}

module.exports = {
  getRulesByName,
  getAllRules,
  createNewRule,
  updateRule,
  deleteExistedRule,
};
