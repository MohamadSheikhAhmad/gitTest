var mongoose = require("mongoose");
const { fileSchema } = require("../../DataBase/modules/fileDB");
const {
  getMongooseConnection,
  returnFileCollections,
} = require("../../DataBase/DBmongoose");

async function getLogs(log_file, databaseName) {
  const connecting = await getMongooseConnection(databaseName);
  const File = connecting.connection.model(log_file, fileSchema);
  //const File = mongoose.model("File", fileSchema, log_file);
  try {
    const logs = await File.find({}).exec();
    //console.log('Logs as an array:', logs);
    return logs;
  } catch (err) {
    console.error("Error:", err);
  }
}

/* this function is responsoable for getting all the files (collections of files) that in the database */
async function getFiles(databaseName, callback) {
  try {
    const filesNames = await returnFileCollections(databaseName);
    callback(null, filesNames);
  } catch (error) {
    callback(err, null);
  }
}

module.exports = { getLogs, getFiles };
