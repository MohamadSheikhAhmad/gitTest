var express = require("express");
var router = express.Router();

router.post("/", async (req, res) => {
  const result = await req.service.createNewRule("temp", req);
  if (result === "user already exists") {
    res.send(400, result);
  } else {
    res.send(200, result);
  }
});

module.exports = router;
