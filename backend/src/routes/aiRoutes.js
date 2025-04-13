const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");

router.post("/detect", aiController.processAIResult);

module.exports = router;
