const mongoose = require("mongoose");

const cameraSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rtsp_url: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Camera", cameraSchema);
