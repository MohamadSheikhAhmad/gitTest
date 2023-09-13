const getMongooseConnection = require("../../DataBase/DBmongoose");
/**
 *
 * @param {*} databaseName
 * @returns all rules in the database
 *
 */
async function getAllRules(databaseName) {
  try {
    const conn = await getMongooseConnection(databaseName);
    const result = await conn.RulesCollection
      .find
      //{},
      //{ _id: 0, __v: 0, userName: 0 }
      ();
    return result;
  } catch (error) {
    console.log("Error in get all rules", error);
  }
}

/**
 * 1) function that authinticate the user return true/false
 * 2) function that authorize the user for this operation return true/false
 * 3) function that returns username from the token
 */

async function createNewRule(databaseName, req) {
  try {
    const connection = await getDatabaseConnection(databaseName);
    console.log(req.body.ruleName);
    const check = await connection.RulesCollection.findOne({
      ruleName: req.body.ruleName,
    });
    console.log(check);
    if (check) {
      return "rule already exists";
    } else {
      const newRule = new connection.RulesCollection(req.body);
      //////////////////////////////////////////////////////////////////////////////
      // need the midellware from the login team that
      //return the username that make this request
      //const users = connection.UsUserModel.findOne();
      //////////////////////////////////////////////////////////////////////////////
      console.log("new rule " + newRule);
      //console.log("user name" + users);

      newRule.userName = "String";
      const result = await newRule.save();
      return result;
    }
  } catch (error) {
    console.log("Error in creating the user", error);
  }
}

async function deleteExistedRule(databaseName, rulename) {
  try {
    const connection = await getDatabaseConnection(databaseName);
    const ruleExists = await connection.RulesCollection.findOneAndRemove({
      ruleName: rulename,
    });
    if (!ruleExists) return "rule dose not exists!";
    else {
      //////////////////////////////////////////////////////////////////////////////
      //need to chgnge findOneAndRemove to  fiondeOne
      //and then if the rule exist check below
      //and then delete
      //////////////////////////////////////////////////////////////////////////////
      // need the midellware from the login team that
      //return the username that make this request
      //and check if first of all if he is authorized
      //or if he is an admin
      //and then if he owns the rule to be able to modify it
      // which means or he is an admin or the owner of the rule
      //to be able to delete the rule
      //////////////////////////////////////////////////////////////////////////
      console.log(ruleExists);
      return "Deleted Successfully";
    }
  } catch (error) {
    console.log("Error in deleting rule", error);
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
      //////////////////////////////////////////////////////////////////////////////
      //need to chgnge findOneAndRemove to  fiondeOne
      //and then if the rule exist check below
      //and then delete
      //////////////////////////////////////////////////////////////////////////////
      // need the midellware from the login team that
      //return the username that make this request
      //and check if first of all if he is authorized
      //or if he is an admin
      //and then if he owns the rule to be able to modify it
      // which means or he is an admin or the owner of the rule
      //to be able to modify the rule
      //////////////////////////////////////////////////////////////////////////
      for (let elem in req.body) {
        console.log("elem", elem, "reqBody", JSON.stringify(req.body[elem]));
        ruleExists[elem] = req.body[elem];
      }
      const result = await ruleExists.save();
      return result;
    }
  } catch (error) {
    console.log("Error in finding  user", error);
  }
}

async function getDatabaseConnection(databaseName) {
  try {
    const connection = await getMongooseConnection(databaseName);
    return connection;
  } catch (error) {
    console.log("Error in connecting to database ", error);
  }
}
module.exports = { getAllRules, createNewRule, updateRule, deleteExistedRule };
