const {
  getAllUsers,
  createNewUSer,
  updateUser,
  deleteExistedUser,
} = require("./Routes/Service/userManagementService.js");

const {
  getAllRules,
  createNewRule,
  updateRule,
  deleteExistedRule,
} = require("./Routes/Service/rulesService.js");

const {
  deleteExistedLog,
  getAllLogs,
  getLogProcess,
} = require("./Routes/Service/logsService.js");
const login = require("./Routes/Service/LogInService.js");
const signup = require("./Routes/Service/signUpService.js");

const {
  updateCompanyInfo,
  getInfo,
} = require("./Routes/Service/companyDetailsService.js");
var express = require("express");
var app = express();

var bodyParser = require("body-parser");
require("dotenv").config();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS,PUT"
  );
  next();
});

/**
 *
 * inject usermanagement service
 */
const exposeuserMangemnService = async (req, res, next) => {
  req.service = userMangemnservice();
  next();
};
const userMangemnservice = () => {
  return Object.freeze({
    getAllUsers,
    createNewUSer,
    updateUser,
    deleteExistedUser,
  });
};

/**
 *
 * inject rules service
 */
const exposeRuleService = async (req, res, next) => {
  req.service = ruleService();
  next();
};
const ruleService = () => {
  return Object.freeze({
    getAllRules,
    createNewRule,
    updateRule,
    deleteExistedRule,
  });
};

/**
 *
 * inject rules service
 */
const exposeLogService = async (req, res, next) => {
  req.service = logService();
  next();
};
const logService = () => {
  return Object.freeze({
    deleteExistedLog,
    getAllLogs,
    getLogProcess,
  });
};

const exposeLogInService = async (req, res, next) => {
  req.service = LogInService();
  next();
};
const LogInService = () => {
  return Object.freeze({
    login,
  });
};

const exposeSingUpService = async (req, res, next) => {
  req.service = SingUpService();
  next();
};
const SingUpService = () => {
  return Object.freeze({
    signup,
  });
};

const exposecompanyInfoService = async (req, res, next) => {
  req.service = companyInfoservice();
  next();
};
const companyInfoservice = () => {
  return Object.freeze({
    updateCompanyInfo,
    getInfo,
  });
};
app.use(
  "/companyInfo",
  exposecompanyInfoService,
  require("./Routes/Controllers/companyDetailsController.js")
);
app.use(
  "/admin",
  exposeuserMangemnService,
  require("./Routes/Controllers/userManagementController.js")
);
app.use(
  "/logfiles",
  exposeLogService,
  require("./Routes/Controllers/logsController.js")
);
app.use(
  "/rule",
  exposeRuleService,
  require("./Routes/Controllers/rulesController.js")
);
app.use(
  "/signup",
  exposeSingUpService,
  require("./Routes/Controllers/SingUpController.js")
);
app.use(
  "/login",
  exposeLogInService,
  require("./Routes/Controllers/LogInController.js")
);
app.use("/filesystem", require("./FIleSystem/fileSystemController.js"));

app.use("/report", require("./Reports/routes/reports.js"));

var log = require("./Rules/routes/log.js");
app.use("/log", log);

var rule = require("./Rules/routes/rule.js");
app.use("/ruleGroup", rule);

var analyze = require("./Rules/routes/analyze.js");
app.use("/analyze", analyze);

app.listen(5000);
