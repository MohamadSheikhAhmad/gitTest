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

const login = require("./Routes/Service/LogInService.js");
const signup = require("./Routes/Service/signUpService.js");

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
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
app.use(
  "/admin",
  exposeuserMangemnService,
  require("./Routes/Controllers/userManagementController.js")
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

app.listen(8080);
