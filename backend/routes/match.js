const express = require("express");
const Match = require("../models/Match");

const router = express.Router();

// GET ALL MATCHES
router.get("/", async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching matches" });
  }
});

module.exports = router;