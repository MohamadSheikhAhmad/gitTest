const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");

/**
 *
 * @param {*} password
 * @returns the encrypted password that we want to save it in the database
 */

function aaaa(x) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(x);
      const jsonObject = {};
      let connection;

      connection = await mongoose.createConnection(
        "mongodb://localhost:27017/dis"
      );

      connection.once("open", async () => {
        try {
          const UserModel = connection.model(
            "User",
            require("./DataBase/modules/user")
          );
          const reult = await UserModel.findOneAndUpdate(
            { userName: "mohamad" },
            { phone: "0547396529" }
          );
          console.log(reult);
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

aaaa();
