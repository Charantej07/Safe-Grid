const Camera = require("../models/cameraModel");

// Add a new camera
exports.addCamera = async (req, res) => {
  try {
    const { name, rtsp_url, location } = req.body;

    // Check if the camera URL already exists
    const existingCamera = await Camera.findOne({ rtsp_url });
    if (existingCamera)
      return res.status(400).json({ message: "Camera already exists" });

    const camera = new Camera({ name, rtsp_url, location });
    await camera.save();

    res.status(201).json({ message: "Camera added successfully", camera });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all cameras
exports.getAllCameras = async (req, res) => {
  try {
    const cameras = await Camera.find();
    res.json(cameras);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single camera by ID
exports.getCameraById = async (req, res) => {
  try {
    const camera = await Camera.findById(req.params.id);
    if (!camera) return res.status(404).json({ message: "Camera not found" });

    res.json(camera);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a camera by ID
exports.deleteCamera = async (req, res) => {
  try {
    await Camera.findByIdAndDelete(req.params.id);
    res.json({ message: "Camera deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
