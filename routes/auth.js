const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Signup
router.post("/signup", async (req, res) => {
  try {
    if (!req.body.naam || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Sab fields bharo!" });
    }
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exist karta hai!" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      naam: req.body.naam,
      email: req.body.email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).json({ message: "User ban gaya!" });
  } catch (err) {
    res.status(500).json({ message: "Server error!", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Email aur password bharo!" });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User nahi mila!" });
    }
    const passwordSahi = await bcrypt.compare(req.body.password, user.password);
    if (!passwordSahi) {
      return res.status(401).json({ message: "Password galat hai!" });
    }
    const token = jwt.sign({ userId: user._id }, "secret123");
    res.status(200).json({ message: "Login ho gaya!", token });
  } catch (err) {
    res.status(500).json({ message: "Server error!", error: err.message });
  }
});

module.exports = router;