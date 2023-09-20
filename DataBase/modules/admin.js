const mongoose = require("mongoose");

var adminSchema = mongoose.Schema({
  userName: String,
  firstName: String,
  lastName: String,
  companyName: String,
  email: String,
  phone: String,
  password: String,
  role: String,
  imageURL: String,
  firstLogIn: Boolean,
  IOT_IP: String,
  jiraBaseUrl: String,
  jiraEmail: String,
  apiToken: String,
  projectKey: String,
});
module.exports = adminSchema;
