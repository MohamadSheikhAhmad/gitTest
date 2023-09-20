var express = require("express");
var router = express.Router();
const { Auth } = require("../../middlewares/Auth");

router.get("/getInfo", Auth, async (req, res) => {
  const result = await req.service.getInfo(req.user.companyName);
  if (typeof result === "string") {
    if (result.includes("Error")) {
      res.send(400, result);
    }
  }
  res.send(200, result);
});

router.put("/updateInfo", Auth, async (req, res) => {
  const result = await req.service.updateCompanyInfo(req.user.companyName, req);
  if (result === "Error in updating jira info") {
    res.send(400, result);
  } else {
    res.send(200, result);
  }
});

module.exports = router;
