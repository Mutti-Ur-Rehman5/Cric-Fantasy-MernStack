import { useEffect, useState } from "react";
import API from "../api/api";

export default function CreateTeam() {

  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [captain, setCaptain] = useState("");
  const [viceCaptain, setViceCaptain] = useState("");

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const res = await API.get("/admin/players");
      setPlayers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const togglePlayer = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(p => p !== id));
    } else {
      if (selected.length < 11) {
        setSelected([...selected, id]);
      } else {
        alert("Only 11 players allowed");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await API.post("/team/create", {
        userId: "TEMP_USER_ID", // later JWT se aayega
        matchId: "MATCH_ID",    // dashboard se aayega
        playerIds: selected,
        captain,
        viceCaptain
      });

      alert("Team Created Successfully 🚀");

    } catch (err) {
      alert("Error Creating Team");
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold text-green-700 mb-4">
        Create Your Team 🏏
      </h1>

      <p className="mb-4">
        Selected Players: {selected.length} / 11
      </p>

      <div className="grid md:grid-cols-3 gap-4">

        {players.map(player => (
          <div
            key={player._id}
            className={`p-4 rounded shadow cursor-pointer
              ${selected.includes(player._id) ? "bg-green-100" : "bg-white"}`}
            onClick={() => togglePlayer(player._id)}
          >

            <h2 className="font-semibold">{player.name}</h2>
            <p className="text-sm text-gray-500">
              {player.team} | {player.role}
            </p>

            <div className="mt-2 flex gap-2">
              <button
                onClick={(e)=>{e.stopPropagation(); setCaptain(player._id)}}
                className="text-xs bg-yellow-400 px-2 py-1 rounded"
              >
                C
              </button>

              <button
                onClick={(e)=>{e.stopPropagation(); setViceCaptain(player._id)}}
                className="text-xs bg-blue-400 px-2 py-1 rounded"
              >
                VC
              </button>
            </div>

          </div>
        ))}

      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-green-700 text-white px-6 py-2 rounded"
      >
        Submit Team
      </button>

    </div>
  );
}