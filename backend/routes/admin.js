const express = require("express");
const Player = require("../models/Player");
const Match = require("../models/Match");

const router = express.Router();


// ===============================
// ADD PLAYER (TESTING)
// ===============================
router.post("/add-player", async (req, res) => {
  try {
    const { name, team, role, credits } = req.body;

    const player = new Player({
      name,
      team,
      role,
      credits,
    });

    await player.save();

    res.status(201).json(player);

  } catch (error) {
    res.status(500).json({ message: "Error adding player" });
  }
});


// ===============================
// COMPLETE MATCH + UPDATE POINTS
// ===============================
router.post("/complete/:matchId", async (req, res) => {
  try {

    const { playerPoints } = req.body;
    // Format:
    // [{ playerId: "", points: 50 }, ...]

    // Update each player's points
    for (let item of playerPoints) {
      await Player.findByIdAndUpdate(
        item.playerId,
        { points: item.points }
      );
    }

    // Mark match as completed
    await Match.findByIdAndUpdate(
      req.params.matchId,
      { status: "completed" }
    );

    res.json({ message: "Match completed & points updated" });

  } catch (error) {
    res.status(500).json({ message: "Error completing match" });
  }
});

module.exports = router;