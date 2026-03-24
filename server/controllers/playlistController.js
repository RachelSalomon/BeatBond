const Playlist = require("../models/Playlist");

const createPlaylist = async (req, res) => {
  try {
    const { title, description, isPublic } = req.body;

    const newPlaylist = new Playlist({
      title,
      description,
      user: req.user.userId,
      songs: [],
      isPublic: isPublic !== undefined ? isPublic : true,
    });

    await newPlaylist.save();

    res.status(201).json({
      message: "Playlist created successfully",
      playlist: newPlaylist,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getMyPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user.userId });

    res.status(200).json({
      playlists,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const addSongToPlaylist = async (req, res) => {
  try {
    const { song } = req.body;
    const { id } = req.params;

    const playlist = await Playlist.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!playlist) {
      return res.status(404).json({
        message: "Playlist not found",
      });
    }

    playlist.songs.push(song);
    await playlist.save();

    res.status(200).json({
      message: "Song added successfully",
      playlist,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const removeSongFromPlaylist = async (req, res) => {
  try {
    const { song } = req.body;
    const { id } = req.params;

    const playlist = await Playlist.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!playlist) {
      return res.status(404).json({
        message: "Playlist not found",
      });
    }

    playlist.songs = playlist.songs.filter((item) => item !== song);
    await playlist.save();

    res.status(200).json({
      message: "Song removed successfully",
      playlist,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;

    const playlist = await Playlist.findOneAndDelete({
      _id: id,
      user: req.user.userId,
    });

    if (!playlist) {
      return res.status(404).json({
        message: "Playlist not found",
      });
    }

    res.status(200).json({
      message: "Playlist deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getPublicPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ isPublic: true }).populate(
      "user",
      "username email",
    );

    res.status(200).json({
      playlists,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createPlaylist,
  getMyPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
  getPublicPlaylists,
};
