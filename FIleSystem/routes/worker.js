var fs = require("fs");
const fileData = require("../fileData"); // Import the fileData module
var mongoose = require("mongoose");
//mongoose.connect("mongodb://127.0.0.1/FileServer");

const { getMongooseConnection } = require("../../DataBase/DBmongoose");

var fileSchema = mongoose.Schema({
  date: Date,
  info: String,
});
const { parentPort } = require("worker_threads");

parentPort.on("message", (message) => {
  console.log("Received message from main thread:", message);
  var files = message.data;
  files.forEach(async (file) => {
    const conn = await getMongooseConnection(message.db);

    const User = conn.connection.model("file_" + file, fileSchema);

    User.createCollection().then(function (collection) {
      console.log("Collection is created!");
      fs.readFile("./logs/" + file, "utf8", function (err, data) {
        if (err) {
          console.error(err);
          // Send an error response
          res.status(500).send("Internal Server Error");
        } else {
          data = data.replaceAll("[", "");
          data = data.replaceAll("]", "");
          var dataSplit = data.split("\n");
          dataSplit.forEach((line) => {
            var dateStr = line.substring(0, 31);
            var new_file = new User({
              date: dateStr,
              info: line.substring(32, line.length),
            });
            new_file.save();
          });
        }
      });
    });
  });
  fileData.resetUploadedFile();
});

parentPort.postMessage("Successfully uploaded");
