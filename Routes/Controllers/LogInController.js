var express = require("express");
var router = express.Router();

router.post("/", async (req, res) => {
  console.log(`user name is   ${req.body.userName}`);
  console.log(req.service);
  const result = await req.service.login(req);
  if (result.startsWith("Incorrect")) {
    res.send(400, result);
  } else {
    res.status(200).json({ accessToken: result });
  }
});

module.exports = router;
