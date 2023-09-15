const jwt = require("jsonwebtoken");
const Auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      res.sendStatus(406);
    }
    const decoded = await jwt.verify(
      token,
      process.env.JWT_SECRET,
      function (err, decoded) {
        if (err) {
          return undefined;
        } else {
          return decoded;
        }
      }
    );
    if (!decoded) {
      res.sendStatus(403);
    }
    req.user = decoded;
    req.token = token;
    next();
  } catch (err) {
    res
      .status(401)
      .send(err.message ? { messages: [{ message: err.message }] } : err);
  }
};

module.exports = {
  Auth,
};
