const express = require("express");
const router = express.Router();

// Controllers import
const { register, login } = require("../controllers/authController");

// Middleware import
const protect = require("../middleware/authMiddleware");

// =========================
// Auth Routes
// =========================

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

// Protected Route (JWT Required)
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed successfully",
    userId: req.user,
  });
});

module.exports = router;
