const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
      res.json({msg: "Server is running"});
    } catch (err) {
      console.error("Error fetching expenses", err);
      res.status(500).json({ error: "Internal server error" });
    }
});
  