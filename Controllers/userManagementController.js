var express = require("express");
var router = express.Router();

router.get("/get", async (req, res) => {
  console.log(req.service);
  const result = await req.service.getAllUsers("temp");
  res.send(200, result);
});

router.post("/save", async (req, res) => {
  const result = await req.service.createNewUSer("temp", req);
  if (result === "user already exists") {
    res.send(400, result);
  } else {
    res.send(200, result);
  }
});

router.put("/update", async (req, res) => {
  const result = await req.service.updateUser("temp", req);
  if (result !== "User do not exists!") {
    res.send(400, result);
  } else {
    res.send(200, result);
  }
});

router.delete("/delete", async (req, res) => {
  const result = await req.service.deleteExistedUser("temp", req.body.userName);
  if (result !== "User do not exists!") {
    res.send(400, result);
  } else {
    res.send(200, result);
  }
});
module.exports = router;
