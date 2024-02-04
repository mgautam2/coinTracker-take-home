const express = require("express");
const User = require("../Models");
const api = require("../Api");

const router = new express.Router();

// Routes
router.get("/test", function (req, res) {
  const serverRunningMessage = {
    message: "Server is running",
  };
  res.json(serverRunningMessage);
});

router.get("/getWallets", function (req, res) {
  console.log("Get Wallet");
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

router.post("/addWallet", async function (req, res) {
  console.log(" add Wallet");
  const { name, walletAddress } = req.body;

  try {
    await api.WalletInfo(walletAddress);
  } catch (err) {
    let { response } = err;
    return res.json({
      error: "not-found-or-invalid-arg",
      message: "Invalid Wallet Address",
    });
  }

  User.findOne({ name })
    .then((user) => {
      if (user) {
        if (user.walletAddress.includes(walletAddress)) {
          return res.json({
            error: "not-found-or-invalid-arg",
            message: "Wallet Address already exists",
          });
        } else {
          user.walletAddress.push(walletAddress);
          return user
            .save()
            .then((savedUser) => {
              res.json(savedUser);
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        }
      } else {
        return User.create({ name, walletAddress })
          .then((createdUser) => {
            res.json(createdUser);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => res.status(500).json(err));
});
router.post("/removeWallet", async function (req, res) {
  console.log("Remove Wallet");
  const { name, walletAddress } = req.body;

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({
        error: "not-found",
        message: "User not found",
      });
    }

    if (!user.walletAddress.includes(walletAddress)) {
      return res.status(400).json({
        error: "invalid-arg",
        message: "Wallet Address does not exist for this user",
      });
    }

    user.walletAddress = user.walletAddress.filter(
      (address) => address !== walletAddress
    );

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
router.post("/getTransactions", function (req, res) {
  console.log("get Transactions");
  const { walletAddress, page } = req.body;

  api
    .WalletInfo(walletAddress, page)
    .then((data) => {
      res.json(data);
    })
    .catch(({ response }) => {
      console.log(response);
      res.status(400).json(response);
    });
});

module.exports = router;
