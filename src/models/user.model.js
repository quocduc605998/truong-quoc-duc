const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    staff: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    ]
  },
  { timestamps: true }
  )
);

module.exports = User;
