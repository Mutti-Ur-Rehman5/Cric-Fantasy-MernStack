const express = require("express");
const Team = require("../models/Team");
const { calculateTeamPoints } = require("../services/pointsService");

const router = express.Router();

router.get("/:matchId", async (req, res) => {
  try {
    const teams = await Team.find({ matchId: req.params.matchId });

    let leaderboard = [];

    for (let team of teams) {
      const points = await calculateTeamPoints(team._id);

      leaderboard.push({
        teamId: team._id,
        user: team.user,
        points: points || 0,
      });
    }

    // Sort by highest points
    leaderboard.sort((a, b) => b.points - a.points);

    res.json(leaderboard);

  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
});

module.exports = router;