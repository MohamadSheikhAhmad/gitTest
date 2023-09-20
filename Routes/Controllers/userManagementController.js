var express = require("express");
var router = express.Router();
const { Auth } = require("../../middlewares/Auth");

router.get("/get", Auth, async (req, res) => {
  const result = await req.service.getAllUsers(
    req.user.companyName,
    req.user.userName
  );

  if (typeof result === "string") {
    if (result.includes("Error")) {
      res.send(400, result);
    }
  }
  res.send(200, result);
});

router.post("/save", Auth, async (req, res) => {
  const result = await req.service.createNewUSer(req.user.companyName, req);
  if (
    result === "user already exists" ||
    result === "Error in creating the user"
  ) {
    res.send(400, result);
  } else {
    res.send(200, result);
  }
});

router.put("/update", Auth, async (req, res) => {
  console.log(req.body);
  const result = await req.service.updateUser(req.user.companyName, req);
  if (result === "User do not exists!" || result === "Error in updating user") {
    res.send(400, result);
  } else {
    res.send(200, result);
  }
});

router.delete("/delete/:userName", Auth, async (req, res) => {
  console.log(req.params.userName);
  const result = await req.service.deleteExistedUser(
    req.user.companyName,
    req.params.userName
  );
  if (result === "User do not exists!" || result === "Error in updating user") {
    res.send(400, result);
  } else {
    res.send(200, result);
  }
});

module.exports = router;
