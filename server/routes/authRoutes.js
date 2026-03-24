const express = require("express");
const {
  register,
  login,
  followUser,
  getMySocialData,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/follow/:userId", authMiddleware, followUser);
router.get("/me/social", authMiddleware, getMySocialData);

module.exports = router;
