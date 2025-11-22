const express = require("express");
const router = express.Router();
const cyYoungController = require("../controllers/cyYoungController");
const isAuthenticated = require("../middleware/authenticate");

// #swagger.tags = ['cy-young-winners']
router.get("/", cyYoungController.getAllWinners);

// #swagger.tags = ['cy-young-winners']
router.get("/:id", cyYoungController.getSingleWinner);

// #swagger.tags = ['cy-young-winners']
router.post("/", isAuthenticated, cyYoungController.createWinner);

// #swagger.tags = ['cy-young-winners']
router.put("/:id", isAuthenticated, cyYoungController.updateWinner);

// #swagger.tags = ['cy-young-winners']
router.delete("/:id", isAuthenticated, cyYoungController.deleteWinner);

module.exports = router;
