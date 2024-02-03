const express = require("express");
const User = require("../Models");

const router = new express.Router();

// Routes
router.get("/test", function (req, res) {
  const serverRunningMessage = {
    message: "Server is running",
  };
  res.json(serverRunningMessage);
});

router.get("/getWallets", function (req, res) {
  const name = req.query.name;

  User.find({ name })
    .then((users) => {
      if (users.length > 0) {
        res.json(users[0].walletAddress);
      } else {
        res.json([]);
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
