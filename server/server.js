require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const playlistRoutes = require("./routes/playlistRoutes");

const app = express();

app.use(cors());

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/playlists", playlistRoutes);

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("BeatBond server is running");
});

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "This is protected data",
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
