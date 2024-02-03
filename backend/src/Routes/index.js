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
  const { name, walletAddress } = req.body;

  try {
    let data = await api.WalletInfo(walletAddress);
  } catch (err) {
    let { response: errRes } = err;
    res.status(errRes.status).json(errRes.data);
    return;
  }

  // Find the user by name
  User.findOne({ name })
    .then((user) => {
      if (user) {
        // Check if the wallet address already exists
        if (user.walletAddress.includes(walletAddress)) {
          return res
            .status(400)
            .json({ message: "Wallet address already exists." });
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
  const { walletAddress } = req.body;

  api
    .WalletInfo(walletAddress)
    .then((data) => {
      res.json(data);
    })
    .catch(({ response }) => {
      res.status(response.status).json(response.data);
    });
});

module.exports = router;
