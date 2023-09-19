const { getMongooseConnection } = require("../../DataBase/DBmongoose");
const bcryptjs = require("bcryptjs");
/**
 *
 * @param {*} databaseName
 * @returns all users in the database
 */
async function getInfo(databaseName) {
  try {
    const connection = await getDatabaseConnection("AdminDB");
    const result = await connection.adminModel
      .find({ companyName: databaseName })
      .select("IOT_IP jiraBaseUrl jiraEmail apiToken projectKey");
    return result;
  } catch (error) {
    console.log("Error in getting company data", error);
  }
}

/**
 *
 * @param {*} databaseName
 * @param {*} req contains all the information we want to update in that user
 * @returns the updated user object
 */
async function updateCompanyInfo(databaseName, req) {
  try {
    const connection = await getDatabaseConnection("AdminDB");
    const companyAdmin = await connection.adminModel.find({
      companyName: databaseName,
    });
    for (let elem in req.body) {
      companyAdmin[elem] = req.body[elem];
    }
    const result = await companyAdmin.save();
    return result;
  } catch (error) {
    console.log("Error in finding  user", error);
    return "Error in updating jira info";
  }
}

/**
 *
 * @param {*} databaseName
 * @returns connection to the wanted database
 */
async function getDatabaseConnection(databaseName) {
  try {
    const connection = getMongooseConnection(databaseName);
    return connection;
  } catch (error) {
    console.log("Error in connecting to database ", error);
  }
}

module.exports = { updateCompanyInfo, getInfo };
