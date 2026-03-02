const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  matchId: String,
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
  viceCaptain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
});

module.exports = mongoose.model("Team", teamSchema);