const express = require("express");
const Contest = require("../models/Contest");

const router = express.Router();


// Create Contest (Admin Only Later)
router.post("/create", async (req, res) => {
  try {
    const { matchId, name } = req.body;

    const contest = new Contest({
      matchId,
      name,
      teams: [],
    });

    await contest.save();

    res.status(201).json(contest);

  } catch (error) {
    res.status(500).json({ message: "Error creating contest" });
  }
});


// Join Contest (No Fee)
router.post("/join", async (req, res) => {
  try {
    const { contestId, teamId } = req.body;

    const contest = await Contest.findById(contestId);

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    contest.teams.push(teamId);
    await contest.save();

    res.json({ message: "Joined Contest Successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error joining contest" });
  }
});

module.exports = router;