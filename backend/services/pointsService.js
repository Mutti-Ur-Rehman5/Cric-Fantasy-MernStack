const Team = require("../models/Team");
const Player = require("../models/Player");

const calculateTeamPoints = async (teamId) => {

  const team = await Team.findById(teamId)
    .populate("players")
    .populate("captain")
    .populate("viceCaptain");

  if (!team) return null;

  let totalPoints = 0;

  team.players.forEach(player => {

    let playerPoints = player.points;

    if (player._id.toString() === team.captain._id.toString()) {
      playerPoints *= 2;
    }

    else if (player._id.toString() === team.viceCaptain._id.toString()) {
      playerPoints *= 1.5;
    }

    totalPoints += playerPoints;
  });

  return totalPoints;
};

module.exports = { calculateTeamPoints };