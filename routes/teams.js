const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teamsController");
const isAuthenticated = require("../middleware/authenticate");

// #swagger.tags = ['teams']
router.get("/", teamsController.getAllTeams);

// #swagger.tags = ['teams']
router.get("/:id", teamsController.getSingleTeam);

// #swagger.tags = ['teams']
router.post("/", isAuthenticated, teamsController.createTeam);

// #swagger.tags = ['teams']
router.put("/:id", isAuthenticated, teamsController.updateTeam);

// #swagger.tags = ['teams']
router.delete("/:id", isAuthenticated, teamsController.deleteTeam);

module.exports = router;
