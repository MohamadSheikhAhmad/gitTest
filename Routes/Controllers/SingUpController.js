var express = require("express");
var router = express.Router();

router.post("/", async (req, res) => {
  console.log(JSON.stringify(req.body));
  const result = await req.service.signup(req);
  console.log(result);

  if (result.includes("already") || result.includes("failed")) {
    res.send(400, result);
  } else {
    res.send(200, result);
  }
});

module.exports = router;
