const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: [String]
  },
});

// Export the Mongoose model
module.exports = mongoose.model("User", UserSchema);
