import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <h2 className="text-2xl font-semibold text-center py-4">SafeGrid</h2>
      <nav>
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/dashboard">📊 Dashboard</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/live-feed">📹 Live Feed</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/incident-logs">📜 Incident Logs</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/settings">⚙️ Settings</Link>
          </li>
          <li className="p-4 hover:bg-red-700">
            <Link to="/">🚪 Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
