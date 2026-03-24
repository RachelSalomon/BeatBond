const express = require("express");
const {
  createPlaylist,
  getMyPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
  getPublicPlaylists,
} = require("../controllers/playlistController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/discover", getPublicPlaylists);
router.post("/", authMiddleware, createPlaylist);
router.get("/my", authMiddleware, getMyPlaylists);
router.post("/:id/songs", authMiddleware, addSongToPlaylist);
router.delete("/:id/songs", authMiddleware, removeSongFromPlaylist);
router.delete("/:id", authMiddleware, deletePlaylist);

module.exports = router;
