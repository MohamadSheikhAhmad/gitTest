var express = require("express");
const { Auth } = require("../../middlewares/Auth");
var router = express.Router();

router.get("/get", Auth, async (req, res) => {
  const result = await req.service.getAllRules(req.user.companyName);
  if (result === "error") {
    res.send(500, result);
  }
  res.send(200, result);
});

router.post("/save", Auth, async (req, res) => {
  const result = await req.service.createNewRule(req.user.companyName, req);
  if (typeof result === "string") {
    if (result === "rule already exists" || result.includes("Error")) {
      res.send(400, result);
    }
  } else {
    res.send(200, result);
  }
});

router.put("/update", Auth, async (req, res) => {
  const result = await req.service.updateRule(req.user.companyName, req);
  if (typeof result === "string") {
    if (result.includes("not") || result.includes("Error")) {
      res.send(400, result);
    }
  } else {
    res.send(200, result);
  }
});

router.delete("/delete/:ruleName", Auth, async (req, res) => {
  const result = await req.service.deleteExistedRule(req.user.companyName, req);
  if (typeof result === "string") {
    if (result.includes("not")) {
      res.send(400, result);
    }
  } else {
    res.send(200, result);
  }
});
module.exports = router;
