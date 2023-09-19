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

router.delete("/delete/:file_name", Auth, async (req, res) => {
  const result = await req.service.deleteExistedRule(
    req.user.companyName,
    req.params.file_name
  );
  if (typeof result === String) {
    if (result.includes("not")) {
      res.send(400, result);
    }
  } else {
    res.send(200, result);
  }
});
module.exports = router;
