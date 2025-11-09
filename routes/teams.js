const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teamsController");

/**
 * @swagger
 * /teams:
 *   get:
 *     tags: [teams]
 *     summary: Get all teams
 *     responses:
 *       200:
 *         description: List of teams
 */
router.get("/", teamsController.getAllTeams);

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     tags: [teams]
 *     summary: Get team by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team object
 */
router.get("/:id", teamsController.getSingleTeam);

/**
 * @swagger
 * /teams:
 *   post:
 *     tags: [teams]
 *     summary: Create a new team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Team created
 */
router.post("/", teamsController.createTeam);

/**
 * @swagger
 * /teams/{id}:
 *   put:
 *     tags: [teams]
 *     summary: Update team
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       204:
 *         description: Team updated
 */
router.put("/:id", teamsController.updateTeam);

/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     tags: [teams]
 *     summary: Delete team
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Team deleted
 */
router.delete("/:id", teamsController.deleteTeam);

module.exports = router;
