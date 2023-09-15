var express = require("express");
var router = express.Router();

router.get("/get", async (req, res) => {
  console.log(req.service);
  const result = await req.service.getAllUsers(req.user.companyName);
  if (result.includes("Error")) {
    res.send(400, result);
  }
  res.send(200, result);
});

router.post("/save", async (req, res) => {
  const result = await req.service.createNewUSer(req.user.companyName, req);
  if (result === "user already exists") {
    res.send(400, result);
  } else {
    res.send(200, result);
  }
});

router.put("/update", async (req, res) => {
  const result = await req.service.updateUser(req.user.companyName, req);
  if (result !== "User do not exists!") {
    res.send(400, result);
  } else {
    res.send(200, result);
  }
});

router.delete("/delete", async (req, res) => {
  const result = await req.service.deleteExistedUser(
    req.user.companyName,
    req.body.userName
  );
  if (result !== "User do not exists!") {
    res.send(400, result);
  } else {
    res.send(200, result);
  }
});
module.exports = router;
