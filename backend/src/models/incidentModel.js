const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  camera_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Camera",
    required: true,
  },
  confidence_score: { type: Number, required: true },
  video_url: { type: String, required: false }, // Changed from image_url to video_url
  status: {
    type: String,
    enum: ["Unresolved", "Resolved"],
    default: "Unresolved",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Incident", incidentSchema);
