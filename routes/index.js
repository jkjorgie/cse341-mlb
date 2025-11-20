const express = require("express");
const router = express.Router();

router.use("/api-docs", require("./swagger"));

// #swagger.tags = ['General']
router.get("/", (req, res) => {
  res.json({
    message: "🏏 MLB Data API",
    status: "Running",
    timestamp: new Date().toISOString(),
    docs: "/api-docs",
    authenticated: req.isAuthenticated(),
    user: req.isAuthenticated() ? req.user.username : null,
  });
});

// Authentication routes
router.use("/auth", require("./auth"));

// API routes
router.use("/teams", require("./teams"));
router.use("/cy-young-winners", require("./cyYoungWinners"));

module.exports = router;
