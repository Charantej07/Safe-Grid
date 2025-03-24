const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  camera_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Camera",
    required: true,
  },
  confidence_score: { type: Number, required: true },
  video_url: { type: String, required: false },
  storage_type: { type: String, enum: ["local", "cloud"], default: "local" }, // New field
  status: {
    type: String,
    enum: ["Unresolved", "Resolved"],
    default: "Unresolved",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Incident", incidentSchema);
