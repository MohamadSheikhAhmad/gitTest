var express = require("express");
var router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.service);
  const result = await req.service.signup(req);
  if (typeof result === String) {
    if (result.includes("already") || result.includes("failed")) {
      res.send(400, result);
    }
  } else {
    res.send(200, result);
  }
});

module.exports = router;
