import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";

const IncidentLogs = () => {
  const [incidents, setIncidents] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    try {
      if (!token) return;
      axios.get(`http://localhost:5000/api/incidents/all?status=${status}&page=${page}`, {
        headers: { Authorization: `${token}` },
      }).then((res) => {
          console.log("Checking the incidents response ",res);
          setIncidents(res.data.incidents);
          setTotalPages(res.data.totalPages);
      });
    } catch (error) {
      console.error("Error fetching Incident Logs: ", error.response?.data?.message);
    }
  }, [status, page]);

  const resolveIncident = (id) => {
    axios.put(
      `http://localhost:5000/api/incidents/${id}/resolve`, 
      {},
      { headers: { Authorization: `${token}` } }
    ).then(() => {
      setIncidents(incidents.map((incident) =>
        incident._id === id ? { ...incident, status: "Resolved" } : incident
      ));
    }).catch((error) => {
      console.error("Error resolving incident:", error.response?.data?.message);
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 ml-64 w-full">
        <h1 className="text-3xl font-semibold">📜 Incident Logs</h1>

        <div className="mb-4">
          <label className="mr-2">Filter by Status:</label>
          <select className="p-2 bg-gray-800 text-white rounded" onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="Unresolved">Unresolved</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

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

        <div className="mt-4 flex justify-between">
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className="px-4 py-2 bg-gray-800 text-white rounded">Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} className="px-4 py-2 bg-gray-800 text-white rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default IncidentLogs;
