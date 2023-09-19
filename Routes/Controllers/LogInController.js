var express = require("express");
var router = express.Router();

router.post("/", async (req, res) => {
  const result = await req.service.login(req);
  if (typeof result === String) {
    if (result.startsWith("Incorrect") || result.startsWith("failed")) {
      res.status(400).json({ success: false, result });
    }
  } else {
    var obj = {
      success: true,
      accessToken: result.JWTtoken,
      firstName: tokenPayload.firstName,
      lastName: tokenPayload.lastName,
      role: result.role,
    };
    res.status(200).json(obj);
  }
});

module.exports = router;
