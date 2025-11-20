const express = require("express");
const router = express.Router();
const cyYoungController = require("../controllers/cyYoungController");
const { isAuthenticated } = require("../middleware/auth");

// Public routes - anyone can view Cy Young winners
// #swagger.tags = ['cy-young-winners']
router.get("/", cyYoungController.getAllWinners);

// #swagger.tags = ['cy-young-winners']
router.get("/:id", cyYoungController.getSingleWinner);

// Protected routes - require authentication
// #swagger.tags = ['cy-young-winners']
// #swagger.security = [{ "githubOAuth": [] }]
router.post("/", isAuthenticated, cyYoungController.createWinner);

// #swagger.tags = ['cy-young-winners']
// #swagger.security = [{ "githubOAuth": [] }]
router.put("/:id", isAuthenticated, cyYoungController.updateWinner);

// #swagger.tags = ['cy-young-winners']
// #swagger.security = [{ "githubOAuth": [] }]
router.delete("/:id", isAuthenticated, cyYoungController.deleteWinner);

module.exports = router;
