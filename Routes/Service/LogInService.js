const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  getMongooseConnection,
  checkDatabaseExistence,
} = require("../../DataBase/DBmongoose");
/**
 *
 * @param {*} req
 * @returns
 *
 * need to check if the user have loged in with google or regular username
 
 */
async function login(req) {
  try {
    console.log("iam here ");
    console.log(req.body);
    //const companyName = paraseCompanyNameFromUserName(req.body.userName);
    console.log(`user name is   ${req.body.userName}`);
    const [companyName, username] = paraseCompanyNameFromUserName(
      req.body.userName
    );

    //const companyName = paraseCompanyNameFromEmail(req.body.username);
    const password = req.body.password;
    //check if company is defined
    const dbCheck = await checkCompany(companyName);

    console.log(`companyName ${companyName}  username ${username} `);
    console.log(`db check  ${dbCheck}`);

    if (!dbCheck) return `Incorrect company ${companyName} `;

    const connection = await getMongooseConnection(companyName);

    const userExist = await connection.UserModel.find({ userName: username });
    if (!userExist) return "Incorrect username";
    const pass = userExist[0].password;

    const isMatch = await bcryptjs.compare(password, pass);
    if (!isMatch) return "Incorrect password!";

    /*
    if(userExist.firstLogIn){
      return "need to reset password";
    }
    */
    const tokenPayload = {
      userName: userExist[0].userName,
      email: userExist[0].email,
      role: userExist[0].role,
      firstName: userExist[0].firstName,
      lastName: userExist[0].lastName,
      username: userExist[0].username,
      companyName: userExist[0].companyName,
    };
    const JWTtoken = jwt.sign(tokenPayload, process.env.JWT_SECRET);
    return JWTtoken;
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 * @param {*} email
 * @returns extract the company name from the email
 */
const paraseCompanyNameFromEmail = (email) => {
  const domain = email.match(/@(.+)\.com$/);
  //amdocs
  //amdocs.mustafa
  if (domain && domain.length > 1) {
    const companyName = domain[1];
    console.log(companyName);
    return companyName;
  } else {
    console.log("Invalid email address");
  }
};
/**
 *
 * @param {*} string
 * @returns extract company name from the username
 */
function paraseCompanyNameFromUserName(username) {
  //user name  =>  companyName.userName
  console.log(username);
  const parts = username.split(".");

  return parts;
}
/**
 *
 * @param {*} companyName
 * @returns companyFlag  => true/false if the database for this company exists
 */
async function checkCompany(companyName) {
  const companyFlag = checkDatabaseExistence(companyName);
  console.log(`company flag ${companyFlag}`);
  return companyFlag;
}

module.exports = login;
