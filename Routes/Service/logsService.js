const { getMongooseConnection } = require("../../DataBase/DBmongoose");

async function getAllLogs(databaseName) {
  try {
    const conn = await getDatabaseConnection(databaseName);

    const result = await conn.LogSchema.find({}, { _id: 0, __v: 0 });
    return result;
  } catch (error) {
    console.log("Error in get all rules", error);
    return "error";
  }
}

async function getLogProcess(databaseName, logName) {
  try {
    const connection = await getDatabaseConnection(databaseName);

    const result = await connection.LogSchema.findOne(
      {
        file_name: logName,
      },
      { _id: 0, __v: 0, file_name: 0, userName: 0, file_date: 0 }
    );

    return result;
  } catch (error) {
    console.log("Error in get all rules", error);
    return "error";
  }
}

async function deleteExistedLog(databaseName, req) {
  try {
    const connection = await getDatabaseConnection(databaseName);

    const ruleExists = await connection.LogSchema.findOne({
      file_name: req.params.file_name,
    });

    if (!ruleExists) return "log dose not exists!";
    else {
      if (
        ruleExists.userName === req.user.userName ||
        req.user.role === "admin"
      ) {
        const deletedRule = await connection.LogSchema.findOneAndRemove({
          file_name: req.params.file_name,
        });
        return "Deleted Successfully";
      } else {
        return "not authorized";
      }
    }
  } catch (error) {
    //console.log("Error in deleting rule", error);
    return "Error not able to delete the rule   ";
  }
}

async function getDatabaseConnection(databaseName) {
  try {
    const connection = getMongooseConnection(databaseName);
    return connection;
  } catch (error) {
    console.log("Error in connecting to database ", error);
  }
}
module.exports = {
  deleteExistedLog,
  getLogProcess,
  getAllLogs,
};
