import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import socket from "../api/socket";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);

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
        <h1 className="text-3xl font-semibold">Live Alerts</h1>
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
