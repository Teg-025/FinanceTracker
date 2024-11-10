const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("./../../models/User");
const jwt = require("jsonwebtoken");
const fetchUser = require("../../middlewares/fetchUser");
const { body, validationResult } = require("express-validator");

// Sign-up endpoint
router.post(
  "/create",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("name", "Name should be at least 3 characters long").isLength({ min: 3 }),
    body("password", "Password should be at least 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      const user = new User({ name, email, password: secPass });
      await user.save();

      res.json({ msg: "User created successfully" });
    } catch (err) {
      console.error("Error saving user:", err);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// Login endpoint
router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, "$love$eldenring");

      res.json({ authToken: token });
    } catch (err) {
      console.error("Error logging in:", err);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// Get user endpoint
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
