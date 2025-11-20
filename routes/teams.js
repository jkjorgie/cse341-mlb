const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teamsController");
const { isAuthenticated } = require("../middleware/auth");

// Public routes - anyone can view teams
// #swagger.tags = ['teams']
router.get("/", teamsController.getAllTeams);

// #swagger.tags = ['teams']
router.get("/:id", teamsController.getSingleTeam);

// Protected routes - require authentication
// #swagger.tags = ['teams']
// #swagger.security = [{ "githubOAuth": [] }]
router.post("/", isAuthenticated, teamsController.createTeam);

// #swagger.tags = ['teams']
// #swagger.security = [{ "githubOAuth": [] }]
router.put("/:id", isAuthenticated, teamsController.updateTeam);

// #swagger.tags = ['teams']
// #swagger.security = [{ "githubOAuth": [] }]
router.delete("/:id", isAuthenticated, teamsController.deleteTeam);

module.exports = router;
