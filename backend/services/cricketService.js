const axios = require("axios");

const fetchMatchDetails = async (matchId) => {
  try {
    const response = await axios.get(
      `https://api.sportradar.com/cricket/matches/${matchId}`,
      {
        headers: {
          "x-api-key": process.env.CRICKET_API_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error.message);
    return null;
  }
};

module.exports = { fetchMatchDetails };