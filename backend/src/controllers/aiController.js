const { exec } = require("child_process");
const { ObjectId } = require("mongoose").Types;
const Incident = require("../models/incidentModel");
const { io } = require("../app");

// Process AI Result
exports.processAIResult = async (req, res) => {
  try {
    const { threat_detected, confidence_score, video_url } = req.body;

    if (
      typeof threat_detected !== "boolean" ||
      !confidence_score ||
      !video_url
    ) {
      return res.status(400).json({
        message:
          "Missing required fields (threat_detected, confidence_score, video_url)",
      });
    }

    const camera_id = new ObjectId(); // Generate new Camera ID
    if (threat_detected) {
      console.log(`⚠️ Threat detected! Capturing video from ${video_url}...`);

      // Run capture_clip.py with the correct parameters
      exec(
        `python src/services/capture_clip.py "${video_url}" "${camera_id}" "${confidence_score}"`,
        async (error, stdout, stderr) => {
          if (error) {
            console.error("❌ Error capturing video:", error);
            return res.status(500).json({ message: "Error capturing video" });
          }

          console.log(stdout); // Log output from Python script
          res.json({
            message: "Threat detected, video captured & uploaded",
          });
        }
      );
    } else {
      res.json({ message: "AI prediction received, no threat detected" });
    }
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
