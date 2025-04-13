const express = require("express");
const router = express.Router();
const cameraController = require("../controllers/cameraController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected routes (require authentication)
router.post("/add", authMiddleware.authenticate, cameraController.addCamera);
router.get("/all", authMiddleware.authenticate, cameraController.getAllCameras);
router.get("/:id", authMiddleware.authenticate, cameraController.getCameraById);
router.delete("/:id", authMiddleware.authenticate, cameraController.deleteCamera);

module.exports = router;
