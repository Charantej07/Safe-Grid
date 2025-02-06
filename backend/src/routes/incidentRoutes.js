const express = require("express");
const router = express.Router();
const incidentController = require("../controllers/incidentController");

router.get("/all", incidentController.getAllIncidents);
router.put("/:id/resolve", incidentController.resolveIncident);

module.exports = router;
