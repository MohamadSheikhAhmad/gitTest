var express = require("express");
var router = express.Router();

router.post("/", async (req, res) => {
  const result = await req.service.login(req);
  if (typeof result === String) {
    if (result.startsWith("Incorrect") || result.startsWith("failed")) {
      res.send(400, { success: false, result });
    }
  } else {
    res
      .status(200)
      .json({ success: true, accessToken: result, role: req.user.role });
  }
});

module.exports = router;
