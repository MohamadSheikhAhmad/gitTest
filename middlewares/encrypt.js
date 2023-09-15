const bcryptjs = require("bcryptjs");

/**
 *
 * @param {*} password
 * @returns the encrypted password that we want to save it in the database
 */

async function encryptedPassword() {
  const password = "default";
  const salt = await bcryptjs.genSalt(8);
  const encryptedPassword = await bcryptjs.hash(password, salt);
  return encryptedPassword;
}

/**
 *
 * @param {*} password
 * @returns the encrypted password that we want to save it in the database
 */

async function validatePAssword(password, dbpassword) {
  const isMatch = await bcryptjs.compare(password, dbpassword);
  console.log(isMatch);
  return isMatch;
}
module.exports = { encryptedPassword, validatePAssword };
