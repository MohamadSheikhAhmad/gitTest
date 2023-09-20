const { getMongooseConnection } = require("../../DataBase/DBmongoose");
const bcryptjs = require("bcryptjs");
/**
 *
 * @param {*} databaseName
 * @returns all users in the database
 */
async function getAllUsers(databaseName, usern) {
  try {
    const connection = await getDatabaseConnection(databaseName);
    const result = await connection.UserModel.find(
      {},
      { _id: 0, __v: 0, password: 0, firstLogIn: 0, companyName: 0 }
    );
    console.log(result);
    const final = result.filter((user) => user.userName !== usern);
    console.log(final);
    return final;
  } catch (error) {
    console.log("Error in get all users", error);
  }
}
/**
 *
 * @param {*} databaseName
 * @param {*} req the request body that was send to the backend
 * @returns creates and return new user
 */

async function createNewUSer(databaseName, req) {
  try {
    const connection = await getDatabaseConnection(databaseName);
    console.log(req.body.userName);
    const check = await connection.UserModel.findOne({
      userName: req.body.userName,
    });
    console.log(check);
    if (check) {
      return "user already exists";
    } else {
      const encrypted = await encryptedPassword();
      const newUser = new connection.UserModel(req.body);
      console.log(newUser);
      newUser.companyName = databaseName;
      newUser.password = encrypted;
      newUser.firstLogIn = true;
      const result = await newUser.save();
      return result;
    }
  } catch (error) {
    console.log("Error in creating the user", error);
    return "Error in creating the user";
  }
}

/**
 *
 * @param {*} databaseName
 * @param {*} username the username we want to delete
 *
 */
async function deleteExistedUser(databaseName, username) {
  try {
    const connection = await getDatabaseConnection(databaseName);
    const userExists = await connection.UserModel.findOneAndRemove({
      userName: username,
    });
    if (!userExists) return "User dose not exists!";
    else {
      return "Deleted Successfully";
    }
  } catch (error) {
    console.log("Error in deleting user", error);
    return "Error in updating user";
  }
}

/**
 *
 * @param {*} databaseName
 * @param {*} req contains all the information we want to update in that user
 * @returns the updated user object
 */
async function updateUser(databaseName, req) {
  try {
    const connection = await getDatabaseConnection(databaseName);
    const username = req.body.userName;
    const userExists = await connection.UserModel.findOne({
      userName: username,
    });
    console.log(userExists);
    if (!userExists) return "User dose not exists!";
    else {
      for (let elem in req.body) {
        userExists[elem] = req.body[elem];
      }
      const result = await userExists.save();
      return result;
    }
  } catch (error) {
    console.log("Error in finding  user", error);
    return "Error in updating user";
  }
}

/**
 *
 * @param {*} password
 * @returns the encrypted password that we want to save it in the database
 */

async function encryptedPassword() {
  const password = "default";
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
    const connection = getMongooseConnection(databaseName);
    return connection;
  } catch (error) {
    console.log("Error in connecting to database ", error);
  }
}

module.exports = { getAllUsers, createNewUSer, updateUser, deleteExistedUser };
