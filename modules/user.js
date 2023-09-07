const mongoose = require("mongoose");

var personSchema = mongoose.Schema({
  userName: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  password: String,
  role: String,
  imageURL: String,
  firstLogIn: Boolean,
});
module.exports = personSchema;
