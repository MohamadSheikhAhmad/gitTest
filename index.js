const {
  getAllUsers,
  createNewUSer,
  updateUser,
  deleteExistedUser,
} = require("./Service/userManagementService.js");

const {
  getAllRules,
  createNewRule,
  updateRule,
  deleteExistedRule,
} = require("./Service/rulesService.js");

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

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
app.use(
  "/admin",
  exposeuserMangemnService,
  require("./Controllers/userManagementController.js")
);
app.use(
  "/rule",
  exposeRuleService,
  require("./Controllers/rulesController.js")
);
app.listen(8080);
