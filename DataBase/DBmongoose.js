const { json } = require("express");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

const connectionString = "mongodb://0.0.0.0/"; //"mongodb+srv://sheikhahmadmoh:Abgadhwaz%40123@cluster0.qtmlqtq.mongodb.net/";

let ConnectionArr = [];

/**
 * @param {*} databaseName 
 * @returns object that have coonection to the wanted database 
at the begining we check if we have an already open connection
if not we open a new connection
*/
const getMongooseConnection = async (databaseName) => {
  let DBC = checkConnection(databaseName);
  if (DBC === false) {
    console.log(`database connection not found ${databaseName}`);
    DBC = addConnection(databaseName);
  }
  return DBC;
};

/**
 * 
 * @param {*} databaseName 
 * @returns check if we have an open connection to the database 
  if yes return that conn@returns ection   
 */
function checkConnection(databaseName) {
  for (const DBC of ConnectionArr) {
    if (DBC.databaseName === databaseName) {
      console.log(`database connection found ${databaseName}`);
      return DBC;
    }
  }
  return false;
}

/**
 * @param {*} databaseName 
 * open a new connection to the wanted database and return that connection 
  add that connection to the array of connection to un up coming requsts for that database 
 */
function addConnection(databaseName) {
  const jsonObject = {};
  const uri = connectionString + databaseName;
  const connection = mongoose.createConnection(uri);

  /*
add the mongoose models to the specific connection
*/
  const UserModel = connection.model("User", require("./modules/user"));

  const RulesCollection = connection.model(
    "RulesCollection",
    require("./modules/RulesCollection")
  );
  const LogSchema = connection.model(
    "LogSchema",
    require("./modules/logSchem")
  );

  jsonObject.databaseName = databaseName;
  jsonObject.UserModel = UserModel;
  jsonObject.RulesCollection = RulesCollection;
  jsonObject.LogSchema = LogSchema;

  ConnectionArr.push(jsonObject);
  return jsonObject;
}

/**
 *
 * @param {*} databaseURL
 * @returns list of existed databases for the system
 */
async function checkDatabaseExistence(databaseURL) {
  try {
    await mongoose.connect("mongodb://0.0.0.0/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const adminDb = mongoose.connection.db.admin();
    const databasesList = await adminDb.listDatabases();

    const databaseNames = databasesList.databases.map((db) => db.name);
    console.log("List of databases:", databaseNames);
    const databaseExists = databasesList.databases.some(
      (db) => db.name === databaseURL
    );
    return databaseExists;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.connection.close();
  }
}

function func() {
  const MongoClient = require("mongodb").MongoClient;

  const connectionString =
    "mongodb+srv://sheikhahmadmoh:Abgadhwaz@123@cluster0.qtmlqtq.mongodb.net/";

  const getDatabaseConnection = (databaseName) => {
    return MongoClient.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then((client) => {
        return client.getDB(databaseName);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  module.exports = {
    getDatabaseConnection,
  };
}

module.exports = getMongooseConnection;
