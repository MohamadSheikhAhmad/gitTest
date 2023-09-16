const { json } = require("express");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

//const connectionString = "mongodb://0.0.0.0/"; //"mongodb+srv://sheikhahmadmoh:Abgadhwaz%40123@cluster0.qtmlqtq.mongodb.net/";
const connectionString = "mongodb://localhost:27017/"; //"mongodb+srv://sheikhahmadmoh:Abgadhwaz%40123@cluster0.qtmlqtq.mongodb.net/";

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
    DBC = addConnection2(databaseName);
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
async function addConnection(databaseName) {
  const jsonObject = {};
  const uri = connectionString + databaseName;
  const connection = await mongoose.createConnection(uri);

  /*
add the mongoose models to the specific connection
in case its the main database for admin add only user model
*/
  if (databaseName !== "AdminDB") {
    const RulesCollection = connection.model(
      "RulesCollection",
      require("./modules/RulesCollection")
    );
    const LogSchema = connection.model(
      "LogSchema",
      require("./modules/logSchem")
    );

    jsonObject.RulesCollection = RulesCollection;
    jsonObject.LogSchema = LogSchema;
  }
  const UserModel = connection.model("User", require("./modules/user"));

  jsonObject.databaseName = databaseName;
  jsonObject.UserModel = UserModel;

  ConnectionArr.push(jsonObject);
  return jsonObject;
}

async function addConnection2(databaseName) {
  return new Promise(async (resolve, reject) => {
    try {
      const jsonObject = {};
      const uri = connectionString + databaseName;
      const connection = await mongoose.createConnection(uri);
      connection.once("open", async () => {
        try {
          const adminDb = connection.db.admin();

          /*
  add the mongoose models to the specific connection
  in case its the main database for admin add only user model
  */
          if (databaseName !== "AdminDB") {
            const RulesCollection = connection.model(
              "RulesCollection",
              require("./modules/RulesCollection")
            );
            const LogSchema = connection.model(
              "LogSchema",
              require("./modules/logSchem")
            );

            jsonObject.RulesCollection = RulesCollection;
            jsonObject.LogSchema = LogSchema;
          }
          const UserModel = connection.model("User", require("./modules/user"));

          jsonObject.databaseName = databaseName;
          jsonObject.UserModel = UserModel;

          ConnectionArr.push(jsonObject);
          resolve(jsonObject); // Resolve the promise with the result
        } catch (error) {
          console.error("Error:", error);
          reject(error); // Reject the promise on error
        }
      });

      // Handle connection errors
      connection.on("error", (error) => {
        console.error("Mongoose connection error:", error);
        reject(error); // Reject the promise on error
      });
    } catch (error) {
      console.error(error);
      reject(error); // Reject the promise on error
    }
  });
}

/**
 *
 * @param {*} databaseURL
 * @returns list of existed databases for the system
 */
async function checkDatabaseExistence(databaseName) {
  return new Promise(async (resolve, reject) => {
    try {
      //const connectionString =
      //"mongodb+srv://nawrasrabeeaa99:0frN4gIrcryrKWsz@mydatadb.hnd4abh.mongodb.net/moviesdb?retryWrites=true&w=majority";
      const connection = mongoose.createConnection(connectionString);
      connection.once("open", async () => {
        try {
          const adminDb = connection.db.admin();
          const databases = await adminDb.listDatabases();
          const exists = databases.databases.some(
            (db) => db.name === databaseName
          );
          console.log(databases);
          connection.close();
          resolve(exists); // Resolve the promise with the result
        } catch (error) {
          console.error("Error:", error);
          reject(error); // Reject the promise on error
        }
      });

      // Handle connection errors
      connection.on("error", (error) => {
        console.error("Mongoose connection error:", error);
        reject(error); // Reject the promise on error
      });
    } catch (error) {
      console.error(error);
      reject(error); // Reject the promise on error
    }
  });
}

function func() {
  const MongoClient = require("mongodb").MongoClient;

  const connectionString =
    "mongodb+srv://nawrasrabeeaa99:0frN4gIrcryrKWsz@mydatadb.hnd4abh.mongodb.net/moviesdb?retryWrites=true&w=majority";
  // "mongodb+srv://sheikhahmadmoh:Abgadhwaz@123@cluster0.qtmlqtq.mongodb.net/";
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

module.exports = { getMongooseConnection, checkDatabaseExistence };

//module.exports = getMongooseConnection, checkDatabaseExistence;
