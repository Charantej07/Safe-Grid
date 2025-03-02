const express = require("express");
const router = express.Router();
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
  authorizeRoles("admin","security"),
  incidentController.resolveIncident
);
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  incidentController.deleteIncident
);

module.exports = router;
