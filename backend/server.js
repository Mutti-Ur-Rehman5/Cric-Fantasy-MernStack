require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// ✅ Connect Database
connectDB();

// ✅ Middlewares
app.use(cors());
app.use(express.json());


app.use("/api/auth", require("./routes/auth"));

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Fantasy Cricket API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});