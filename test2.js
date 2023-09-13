const jwt = require("jsonwebtoken");

const createToken = (pay) => {
  //All data we want to save into the token ; save user id in the token
  return jwt.sign(pay, "process.env.SECRET_CODE");
};

async function tt() {
  const tokenPayload = {
    email: "userExist.email",
    role: "role",
    firstName: "firstName",
    lastName: "lastName",
    username: "username",
    companyName: "companyName",
  };
  const JWTtoken = createToken(tokenPayload);
  console.log(JWTtoken);

  const decoded = await jwt.verify(JWTtoken, "process.env.SECRET_CODE");
  console.log(decoded);
}

//tt();
const result = "hellow or";
console.log(result.startsWith("hello"));
