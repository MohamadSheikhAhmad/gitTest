const mongoose = require("mongoose");

var personSchema = mongoose.Schema({
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
});
module.exports = personSchema;
