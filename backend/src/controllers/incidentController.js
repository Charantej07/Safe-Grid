const Incident = require("../models/incidentModel");

// Get All Incident Logs
exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().populate("camera_id");
    console.log(incidents);
    res.json(
      incidents.map((incident) => ({
        _id: incident._id,
        camera_id: incident.camera_id,
        confidence_score: incident.confidence_score,
        video_url: incident.video_url, // Return video URL
        status: incident.status,
        createdAt: incident.createdAt,
      }))
    );
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
