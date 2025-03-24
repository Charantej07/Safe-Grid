const Incident = require("../models/incidentModel");

// Get All Incident Logs
exports.getAllIncidents = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = status ? { status } : {};

    const incidents = await Incident.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Incident.countDocuments(filter);

    res.json({
      incidents,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Mark Incident as Resolved
exports.resolveIncident = async (req, res) => {
  try {
    const { id } = req.params;
    const incident = await Incident.findById(id);
    if (!incident)
      return res.status(404).json({ message: "Incident not found" });

    incident.status = "Resolved";
    await incident.save();

    res.json({ message: "Incident marked as resolved", incident });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteIncident = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the incident exists
    const incident = await Incident.findById(id);
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    // Delete the incident
    await Incident.findByIdAndDelete(id);

    res.json({ message: "Incident deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.uploadIncidentVideo = async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { camera_id, confidence_score } = req.body;

    // Save incident to database
    const newIncident = new Incident({
      camera_id,
      confidence_score,
      video_url: req.files.file[0].location, 
      storage_type: "cloud",
      status: "Unresolved",
    });
    await newIncident.save();
 
    res.json({
      message: "Incident video uploaded successfully",
      video_url: req.files.file[0].location, 
    });
  } catch (err) {
    // Handle errors
    console.error("Error uploading incident video: ", err);
    res.status(500).json({ message: "Upload failed", error: err });
  }
};
