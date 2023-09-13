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

async function checkDatabaseExistence3() {
  try {
    const connection = await mongoose.createConnection("mongodb://0.0.0.0/");

    connection.once("open", async () => {
      try {
        // Access the native MongoDB client instance
        const adminDb = connection.db.admin();

        // List all databases
        const databases = await adminDb.listDatabases();

        // Print the list of database names

        console.log("List of databases:");
        console.log(databases);
        databases.databases.forEach((db) => {
          console.log(`- ${db.name}`);
        });

        // Close the Mongoose connection
        connection.close();
      } catch (error) {
        console.error("Error:", error);
      }
    });

    // Handle connection errors
    connection.on("error", (error) => {
      console.error("Mongoose connection error:", error);
    });
  } catch (error) {
    console.error(error);
  }
}
async function checkDatabaseExistence(databaseName) {
  try {
    const connection = await mongoose.createConnection("mongodb://0.0.0.0/");
    connection.once("open", async () => {
      try {
        const adminDb = connection.db.admin();
        const databases = await adminDb.listDatabases();
        console.log(databases);
        const exists = databases.databases.some(
          (db) => db.name === databaseName
        );
        console.log(exists);
        connection.close();
        return exists;
      } catch (error) {
        console.error("Error:", error);
      }
    });

    // Handle connection errors
    connection.on("error", (error) => {
      console.error("Mongoose connection error:", error);
    });
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  const result = await checkDatabaseExistence("temp");
  console.log(` here  ${result}`);
}
main();
