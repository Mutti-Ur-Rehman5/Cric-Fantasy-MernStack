const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema(
  {
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contest", contestSchema);