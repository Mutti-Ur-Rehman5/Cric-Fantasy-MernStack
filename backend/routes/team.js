const express = require("express");
const Player = require("../models/Player");
const Team = require("../models/Team");
const Match = require("../models/Match");
const { calculateTeamPoints } = require("../services/pointsService");

const router = express.Router();


// ===============================
// CREATE TEAM (WITH MATCH LOCKING)
// ===============================
router.post("/create", async (req, res) => {
  try {
    const { userId, matchId, playerIds, captain, viceCaptain } = req.body;

    // 🔒 Check Match Exists
    const match = await Match.findById(matchId);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    // 🔒 Check Match Status (LOCK SYSTEM)
    if (match.status !== "upcoming") {
      return res.status(400).json({
        message: "Match already started. Team is locked."
      });
    }

    // Rule 1: Exactly 11 players
    if (!playerIds || playerIds.length !== 11) {
      return res.status(400).json({ message: "Select exactly 11 players" });
    }

    // Fetch players from DB
    const players = await Player.find({ _id: { $in: playerIds } });

    // Rule 2: Max 100 credits
    const totalCredits = players.reduce((sum, p) => sum + p.credits, 0);
    if (totalCredits > 100) {
      return res.status(400).json({ message: "Credits exceed 100" });
    }

    // Rule 3: Max 7 players from one team
    const teamCount = {};
    players.forEach(p => {
      teamCount[p.team] = (teamCount[p.team] || 0) + 1;
    });

    for (let team in teamCount) {
      if (teamCount[team] > 7) {
        return res.status(400).json({
          message: "Max 7 players from one team allowed"
        });
      }
    }

    // Rule 4: Captain & Vice Captain must be selected
    if (!playerIds.includes(captain) || !playerIds.includes(viceCaptain)) {
      return res.status(400).json({
        message: "Captain/VC must be in selected players"
      });
    }

    // Create Team
    const newTeam = new Team({
      user: userId,
      matchId,
      players: playerIds,
      captain,
      viceCaptain,
    });

    await newTeam.save();

    res.status(201).json({
      message: "Team Created Successfully",
      newTeam
    });

  } catch (error) {
    res.status(500).json({ message: "Error creating team" });
  }
});


// ===============================
// GET TEAM TOTAL POINTS
// ===============================
router.get("/points/:teamId", async (req, res) => {
  try {

    const totalPoints = await calculateTeamPoints(req.params.teamId);

    if (totalPoints === null) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({ totalPoints });

  } catch (error) {
    res.status(500).json({ message: "Error calculating points" });
  }
});


module.exports = router;