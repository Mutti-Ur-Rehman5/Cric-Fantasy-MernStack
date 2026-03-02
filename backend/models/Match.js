const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  teamA: String,
  teamB: String,
  matchDate: Date,
  status: {
    type: String,
    enum: ["upcoming", "live", "completed"],
    default: "upcoming",
  },
}, { timestamps: true });

module.exports = mongoose.model("Match", matchSchema);