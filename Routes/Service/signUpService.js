const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  getMongooseConnection,
  checkDatabaseExistence,
} = require("../../DataBase/DBmongoose");

async function signup(req) {
  const { userName, password, email, firstName, lastName, companyName, phone } =
    req.body;
  try {
    var dbCheck = await checkCompany(companyName);
    if (dbCheck) {
      console.log(dbCheck);
      return `company ${companyName} already exists `;
    }

    const AdminConnection = await getDatabaseConnection("AdminDB");

    //check if the username and mail is already exist
    const existingEmailUser = await AdminConnection.adminModel.findOne({
      email: email,
    });
    const existingUsernameUser = await AdminConnection.adminModel.findOne({
      userName: userName,
    });
    const existingPhoneNumber = await AdminConnection.adminModel.findOne({
      phone: phone,
    });
    if (existingEmailUser && existingUsernameUser) {
      return "username and email already exists in the system";
    }

    if (existingEmailUser) {
      return "email already exists in the system";
    }

    if (existingUsernameUser) {
      return "username  already exists in the system";
    }
    if (existingPhoneNumber) {
      return "phone number  already exists in the system";
    }
    const connection = await getDatabaseConnection(companyName);
    await connection;

    dbCheck = checkCompany(companyName);

    if (!dbCheck) return `failed to sign up`;
    const encrypted = await encryptedPassword(password);
    var newUser = req.body;
    newUser.password = encrypted;
    newUser.firstLogIn = false;
    newUser.role = "admin";
    const adminResult = await AdminConnection.adminModel.create(newUser);
    const userResult = await connection.UserModel.create(newUser);

    return "sign up success";
  } catch (e) {
    console.log(e);
    return "failed to sign up";
  }
}
/**
 *
 * @param {*} companyName
 * @returns companyFlag  => true/false if the database for this company exists
 */
async function checkCompany(companyName) {
  const companyFlag = checkDatabaseExistence(companyName);
  return companyFlag;
}

async function encryptedPassword(password) {
  const salt = await bcryptjs.genSalt(8);
  const encryptedPassword = await bcryptjs.hash(password, salt);
  return encryptedPassword;
}

/**
 *
 * @param {*} databaseName
 * @returns connection to the wanted database
 */
async function getDatabaseConnection(databaseName) {
  try {
    const connection = await getMongooseConnection(databaseName);
    return connection;
  } catch (error) {
    console.log("Error in connecting to database ", error);
  }
}
module.exports = signup;
