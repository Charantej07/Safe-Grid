import React from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 ml-64 w-full">
        <h1 className="text-3xl font-semibold">Welcome to SafeGrid Dashboard</h1>
        <p className="mt-2 text-gray-600">Monitor live CCTV feeds and incident reports here.</p>
      </div>
    </div>
  );
};

export default Dashboard;
