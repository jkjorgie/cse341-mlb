const express = require("express");
const router = express.Router();
const cyYoungController = require("../controllers/cyYoungController");

// #swagger.tags = ['cy-young-winners']
router.get("/", cyYoungController.getAllWinners);

// #swagger.tags = ['cy-young-winners']
router.get("/:id", cyYoungController.getSingleWinner);

// #swagger.tags = ['cy-young-winners']
router.post("/", cyYoungController.createWinner);

// #swagger.tags = ['cy-young-winners']
router.put("/:id", cyYoungController.updateWinner);

// #swagger.tags = ['cy-young-winners']
router.delete("/:id", cyYoungController.deleteWinner);

module.exports = router;
