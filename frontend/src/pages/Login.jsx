import { useState } from "react";
import API from "../api/api";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful 🚀");

    } catch (error) {
      alert("Login Failed",error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Login to CricFantasy
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-700 text-white p-2 rounded hover:bg-green-800"
        >
          Login
        </button>

      </div>

    </div>
  );
}