const bcryptjs = require("bcryptjs");

/**
 *
 * @param {*} password
 * @returns the encrypted password that we want to save it in the database
 */

async function encryptedPassword() {
  const password = "default";
  const salt = await bcryptjs.genSalt(8);
  console.log(salt);
  const encryptedPassword = await bcryptjs.hash(password, salt);
  return encryptedPassword;
}

async function ttt() {
  const pss = await encryptedPassword();
  console.log(pss);
  const isMatch = await bcryptjs.compare("default", pss);
  console.log(isMatch);
}

ttt();

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
