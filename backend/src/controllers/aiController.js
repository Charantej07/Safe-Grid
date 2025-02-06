const { io } = require("../app"); // Ensure io is imported correctly
const Incident = require("../models/incidentModel");
const { sendAlert } = require("../config/twilio");

exports.processAIResult = async (req, res) => {
  try {
    const { camera_id, threat_detected, confidence_score, video_url } =
      req.body;

    if (
      !camera_id ||
      typeof threat_detected !== "boolean" ||
      !confidence_score ||
      !video_url
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (threat_detected) {
      const newIncident = new Incident({
        camera_id,
        confidence_score,
        video_url,
        status: "Unresolved",
      });

      await newIncident.save();

      // Ensure io is defined before emitting
      if (io) {
        io.emit("new_alert", {
          message: `⚠️ Threat detected at Camera ${camera_id}. Confidence: ${confidence_score}%`,
          confidence_score,
          video_url,
        });
      } else {
        console.error("WebSocket io is undefined");
      }

      // Send Alert via SMS/WhatsApp
      sendAlert(
        `⚠️ Threat detected at Camera ${camera_id}. Confidence: ${confidence_score}%. Watch Video: ${video_url}`
      );
    }

    res.json({ message: "AI prediction received successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
