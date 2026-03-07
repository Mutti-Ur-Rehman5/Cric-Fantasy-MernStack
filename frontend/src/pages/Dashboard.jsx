import { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard() {

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await API.get("/match"); // backend route
      setMatches(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Upcoming Matches 🏏
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {matches.map((match) => (
          <div
            key={match._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >

            <h2 className="text-lg font-semibold">
              {match.teamA} vs {match.teamB}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Status: {match.status}
            </p>

            <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded">
              Create Team
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}