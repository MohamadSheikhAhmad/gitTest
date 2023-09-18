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

console.log(today);

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

var fileSchema = mongoose.Schema({
  date: Date,
  info: String,
});
var RulesSchema = mongoose.Schema({
  userName: String,
  ruleName: String,
  keywords: ["", ""],
});
// var Rule = mongoose.model("Rule", ruleSchema, 'rules');

async function checkFileCollectionExistence(databaseName, rules) {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = mongoose.createConnection(
        `mongodb://localhost:27017/${databaseName}`
      );
      connection.once("open", async () => {
        try {
          const File = connection.model("file_log3.txts", fileSchema);
          const result = await File.find();
          console.log(result);
          connection.close();
          resolve(result); // Resolve the promise with the result
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
  const rules = [
    {
      rule_name: "Error Detection",
      keywords: ["error", "exception", "failure"],
    },
    {
      rule_name: "Warning Identification",
      keywords: ["warning"],
    },
    {
      rule_name: "Authentication Issue",
      keywords: ["authentication", "authorization"],
    },
    {
      rule_name: "Network Anomalies",
      keywords: ["network", "connection"],
    },
    {
      rule_name: "Performance Bottlenecks",
      keywords: ["latency", "bottleneck", "load"],
    },
    {
      rule_name: "Security Breach Attempt",
      keywords: ["attack", "vulnerability"],
    },
    {
      rule_name: "Resource Monitoring",
      keywords: ["resource", "memory", "disk"],
    },
    {
      rule_name: "Successful Transactions",
      keywords: ["success", "transaction"],
    },
    {
      rule_name: "Application Events",
      keywords: ["application", "service", "component"],
    },
    {
      rule_name: "Informational Logs",
      keywords: ["info"],
    },
    {
      rule_name: "Unauthorized Access",
      keywords: ["unauthorized", "access_denied", "intrusion"],
    },
    {
      rule_name: "Anomaly Detection",
      keywords: ["unusual", "abnormal", "anomaly"],
    },
    {
      rule_name: "Malicious Activity",
      keywords: ["malware", "exploit", "attack"],
    },
    {
      rule_name: "Resource Exceedance",
      keywords: ["high_usage", "exceeded_limit"],
    },
  ];
  const rulesWithUpdatedProperty = rules.map((rule) => {
    return {
      userName: "tets",
      ruleName: rule.rule_name,
      keywords: rule.keywords,
    };
  });
  checkFileCollectionExistence("galil", [
    "Application Events",
    "Resource Monitoring",
    "Informational Logs",
  ]);
}

listlists();
