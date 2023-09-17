//const intervalID = setInterval(myCallback, 500, "Parameter 1", "Parameter 2");
const mongoose = require("mongoose");
const Admin = mongoose.mongo.Admin;

function myCallback(a, b) {
  console.log(a);
  console.log(b);
}

/**
 * Add the date time variable to the object when openining new connection to the database
 * create a worker thread with a seperated file
 * in the file the worker checks for the array of objects that contains the connections
 * if 25 minutes have been passed from the current time and the time the connection have
 * been established delete the connetion
 * the worker will go and check each 10 minutes
 * in addition each time we request a connection we update the time variable in the connection
 */

var today = new Date();
const time1 = getCurrentDate() + " " + getCurrentTime();

const time2 = "09/09/2023 15:20:45";

const differenceInMilliseconds = Date.parse(time1) - Date.parse(time2);
const differenceInMinutes = differenceInMilliseconds / 1000 / 60;

function getCurrentDate() {
  return (
    (today.getDate() < 10 ? "0" : "") +
    today.getDate() +
    "/" +
    (today.getMonth() + 1 < 10 ? "0" : "") +
    (today.getMonth() + 1) +
    "/" +
    today.getFullYear()
  );
}
function getCurrentTime() {
  return (
    (today.getHours() < 10 ? "0" : "") +
    today.getHours() +
    ":" +
    (today.getMinutes() < 10 ? "0" : "") +
    today.getMinutes() +
    ":" +
    (today.getSeconds() < 10 ? "0" : "") +
    today.getSeconds()
  );
}

async function checkFileCollectionExistence(databaseName) {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = mongoose.createConnection(
        `mongodb://localhost:27017/${databaseName}`
      );
      connection.once("open", async () => {
        try {
          const db = connection.db; // Get the Db object from the connection
          const collections = await db.listCollections().toArray();
          const collectionNames = collections.map(
            (collection) => collection.name
          );
          connection.close();
          resolve(collectionNames); // Resolve the promise with the result
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
async function listlists() {
  // const collections = await db.db.listCollections().toArray();
  const result = await checkFileCollectionExistence("galil");
  console.log(result);
}

listlists();
