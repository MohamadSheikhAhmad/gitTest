var express = require("express");
var router = express.Router();
const { getFiles } = require("../utils/file_utils");
const { Auth } = require("../../middlewares/Auth");

router.get("/", Auth, function (req, res) {
  // get all the Logs from the log
  getFiles(req.user.companyName, (err, collectionNames) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      //get all the files
      res.json(collectionNames);
    }
  });
});

module.exports = router;
