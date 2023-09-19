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

const rules = {
  ruleName: "aaa",
  keywords: ["ssl:warn", "core:notice"],
};
const logs =
  "ssl:warn pid 1244:tid 452 AH01909: www.example.com:443:0 server certificate does NOT include an ID which matches the server name";
var result = logAnalyze(logs, rules);
console.log(result);
//func();
function rulesAnalyze(raw, rules) {
  //console.log(raw);
  //console.log(rules); works
  var messageLowerCase = raw.message.toLowerCase();
  const classificationScores = {};

  for (const rule of rules) {
    for (const keyword of rule.keywords) {
      const keywordRegex = new RegExp(`\\b${keyword}\\b`, "i"); // Match whole word, case-insensitive
      const matches = messageLowerCase.match(keywordRegex);

      if (matches) {
        classificationScores[rule.rule_name] =
          (classificationScores[rule.rule_name] || 0) + matches.length;
      }
    }
  }
  const sortedClassifications = Object.entries(classificationScores).sort(
    (a, b) => b[1] - a[1]
  );
  raw.rule =
    sortedClassifications.length > 0
      ? sortedClassifications[0][0]
      : "Unclassified";
  return raw;
}

function logAnalyze(logEntry, rules) {
  //addd the raw in the (raw)
  //console.log(logEntry);
  var log = {
    _id: logEntry._id,
    rule: null,
    rank: null,
    message: logEntry.info,
    date: logEntry.date,
  };
  console.log(log);

  log = rulesAnalyze(log, rules);
  //here call the rankAnalyze

  return log;
}
