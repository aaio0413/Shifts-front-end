const router = require("express").Router();

router.get("/", (req, res) => {
  console.log(req.user);
  res.send("you are logged in, this is your profile - " + req.user.userName);
});

module.exports = router;
