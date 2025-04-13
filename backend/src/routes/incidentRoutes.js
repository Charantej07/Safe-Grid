const express = require("express");
const router = express.Router();
const upload = require("../config/cloudStorage");
const incidentController = require("../controllers/incidentController");
const {
  authenticate,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router.get(
  "/all",
  authenticate,
  authorizeRoles("admin", "security"),
  incidentController.getAllIncidents
);
router.put(
  "/:id/resolve",
  authenticate,
  authorizeRoles("admin", "security"),
  incidentController.resolveIncident
);
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  incidentController.deleteIncident
);

router.post(
  "/upload",
  upload.fields([{ name: "file", maxCount: 1 }]),
  incidentController.uploadIncidentVideo
);

module.exports = router;
