const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teamsController");

// #swagger.tags = ['teams']
router.get("/", teamsController.getAllTeams);

// #swagger.tags = ['teams']
router.get("/:id", teamsController.getSingleTeam);

// #swagger.tags = ['teams']
router.post("/", teamsController.createTeam);

// #swagger.tags = ['teams']
router.put("/:id", teamsController.updateTeam);

// #swagger.tags = ['teams']
router.delete("/:id", teamsController.deleteTeam);

module.exports = router;
