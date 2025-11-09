const express = require("express");
const router = express.Router();
const cyYoungController = require("../controllers/cyYoungController");

/**
 * @swagger
 * /cy-young-winners:
 *   get:
 *     tags: [cy-young-winners]
 *     summary: Get all Cy Young winners
 *     responses:
 *       200:
 *         description: List of Cy Young winners
 */
router.get("/", cyYoungController.getAllWinners);

/**
 * @swagger
 * /cy-young-winners/{id}:
 *   get:
 *     tags: [cy-young-winners]
 *     summary: Get Cy Young winner by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cy Young winner object
 */
router.get("/:id", cyYoungController.getSingleWinner);

/**
 * @swagger
 * /cy-young-winners:
 *   post:
 *     tags: [cy-young-winners]
 *     summary: Create a new Cy Young winner
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Cy Young winner created
 */
router.post("/", cyYoungController.createWinner);

/**
 * @swagger
 * /cy-young-winners/{id}:
 *   put:
 *     tags: [cy-young-winners]
 *     summary: Update Cy Young winner
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
 *         description: Cy Young winner updated
 */
router.put("/:id", cyYoungController.updateWinner);

/**
 * @swagger
 * /cy-young-winners/{id}:
 *   delete:
 *     tags: [cy-young-winners]
 *     summary: Delete Cy Young winner
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cy Young winner deleted
 */
router.delete("/:id", cyYoungController.deleteWinner);

module.exports = router;
