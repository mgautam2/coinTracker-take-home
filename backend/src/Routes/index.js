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
    let data = await api.WalletInfo(walletAddress);
  } catch (err) {
    let { response: errRes } = err;
    res.status(200).json(errRes.data);
    return;
  }

  // Find the user by name
  User.findOne({ name })
    .then((user) => {
      if (user) {
        // Check if the wallet address already exists
        if (user.walletAddress.includes(walletAddress)) {
          return res.json({
            error: "not-found-or-invalid-arg",
            message: "Wallet address already exists.",
          });
        } else {
          // Add the wallet address to the user's walletAddress array
          user.walletAddress.push(walletAddress);
          // Save the user
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
        // If user does not exist, create a new user
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

router.post("/getTransactions", function (req, res) {
  console.log("get Transactions")
  const { walletAddress, page } = req.body;

  api
    .WalletInfo(walletAddress, page)
    .then((data) => {
      res.json(data);
    })
    .catch(({ response }) => {
      res.status(response.status).json(response.data);
    });
});

module.exports = router;
