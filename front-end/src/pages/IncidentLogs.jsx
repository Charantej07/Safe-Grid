import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const IncidentLogs = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/incidents/all").then((res) => {
      setIncidents(res.data);
    });
  }, []);

  const resolveIncident = (id) => {
    axios.put(`http://localhost:5000/api/incidents/${id}/resolve`).then(() => {
      setIncidents(incidents.map((incident) =>
        incident._id === id ? { ...incident, status: "Resolved" } : incident
      ));
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 ml-64 w-full">
        <h1 className="text-3xl font-semibold">📜 Incident Logs</h1>
        <ul className="mt-4">
          {incidents.map((incident) => (
            <li key={incident._id} className={`p-3 my-2 border-l-4 ${incident.status === "Unresolved" ? "border-red-500 bg-red-100" : "border-green-500 bg-green-100"}`}>
              <div className="flex justify-between items-center">
                <div>
                  {incident.status === "Unresolved" && (
                    <button className="bg-blue-500 text-white px-3 py-1 mr-3 rounded" onClick={() => resolveIncident(incident._id)}>
                      Mark as Resolved
                    </button>
                  )}
                  <p><strong>Camera:</strong> {incident.camera_id}</p>
                  <p><strong>Threat Confidence:</strong> {incident.confidence_score}%</p>
                  <p><strong>Detected At:</strong> {new Date(incident.createdAt).toLocaleString()}</p>
                </div>
                {incident.video_url && (
                  <video controls className="w-64 h-36 rounded-lg shadow">
                    <source src={incident.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IncidentLogs;
