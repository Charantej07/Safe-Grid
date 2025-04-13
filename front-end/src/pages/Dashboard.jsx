import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import socket from "../api/socket";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({ totalIncidents: 0, resolved: 0, unresolved: 0 });

  // // Fetch past alerts & stats when component mounts
  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/alerts")
  //     .then((res) => setAlerts(res.data))
  //     .catch((error) => {
  //       console.error("Error fetching alerts:", error);
  //       toast.error("Error fetching alerts");
  //     });

  //   axios.get("http://localhost:5000/api/incidents/stats")
  //     .then((res) => setStats(res.data))
  //     .catch((error) => {
  //       console.error("Error fetching stats:", error);
  //       toast.error("Error fetching stats");
  //     });
  // }, []);

  // Listen for new alerts via WebSocket
  useEffect(() => {
    socket.on("new_alert", (alert) => {
      setAlerts((prevAlerts) => [alert, ...prevAlerts]);
      toast.error(`${alert.message} - Watch Video`);
    });

    return () => {
      socket.off("new_alert");
    };
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 ml-64 w-full">
        <h1 className="text-3xl font-semibold">Dashboard</h1>

        {/* Incident Statistics */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-800 text-white p-4 rounded-lg shadow">
            <h3 className="text-xl">Total Incidents</h3>
            <p className="text-3xl">{stats.totalIncidents}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow">
            <h3 className="text-xl">Resolved</h3>
            <p className="text-3xl">{stats.resolved}</p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-lg shadow">
            <h3 className="text-xl">Unresolved</h3>
            <p className="text-3xl">{stats.unresolved}</p>
          </div>
        </div>

        {/* Live Alerts Section */}
        <h2 className="text-2xl font-semibold mt-8">Live Alerts</h2>
        <ul className="mt-4">
          {alerts.map((alert, index) => (
            <li key={index} className="bg-red-100 p-3 my-2 border-l-4 border-red-500">
              {alert.message}
              {alert.video_url && (
                <video controls className="w-64 h-36 rounded-lg shadow mt-2">
                  <source src={alert.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Dashboard;
