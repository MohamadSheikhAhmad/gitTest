const mongoose = require("mongoose");

async function checkDatabaseExistence(databaseName) {
  try {
    const connection = mongoose.createConnection("mongodb://0.0.0.0/");
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

async function func() {
  const [companyName, username] = paraseCompanyNameFromUserName("amdocs.asd");
  console.log(username);
  console.log(companyName);
}

function paraseCompanyNameFromUserName(username) {
  //user name  =>  companyName.userName
  console.log(username);
  const parts = username.split(".");
  console.log(parts);
  console.log(parts[0]);
  return parts;
}
