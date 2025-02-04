const express = require("express");
const router = express.Router();
const cameraController = require("../controllers/cameraController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected routes (require authentication)
router.post("/add", authMiddleware, cameraController.addCamera);
router.get("/all", authMiddleware, cameraController.getAllCameras);
router.get("/:id", authMiddleware, cameraController.getCameraById);
router.delete("/:id", authMiddleware, cameraController.deleteCamera);

module.exports = router;
