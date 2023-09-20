var express = require("express");
const { Auth } = require("../../middlewares/Auth");
var router = express.Router();

router.get("/get", Auth, async (req, res) => {
  const result = await req.service.getAllLogs(req.user.companyName);
  if (result === "error") {
    res.send(500, result);
  }
  res.send(200, result);
});
router.get("/getprocess/:file_name", Auth, async (req, res) => {
  const result = await req.service.getLogProcess(
    req.user.companyName,
    req.params.file_name
  );
  if (result === "error") {
    res.send(500, result);
  }
  res.send(200, result);
});

router.delete("/delete/:file_name", Auth, async (req, res) => {
  const result = await req.service.deleteExistedLog(req.user.companyName, req);
  if (typeof result === "string") {
    if (result.includes("not")) {
      res.send(400, result);
    }
  } else {
    res.send(200, result);
  }
});
module.exports = router;
