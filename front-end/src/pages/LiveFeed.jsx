import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import axios from "axios";

// Helper to check if it's a YouTube link
const isYouTubeUrl = (url) => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};

// Extract videoId from full YouTube URL
const getYouTubeVideoId = (url) => {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
};

const LiveFeed = () => {
  const [cameras, setCameras] = useState([]);
  const token = useSelector((state) => state.auth.token); // Get token from Redux

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        if (!token) return; // Ensure token exists

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/camera/all`,
          {
            headers: { Authorization: `${token}` },
          }
        );

        setCameras(res.data);
      } catch (error) {
        console.error("Error fetching cameras:", error.response?.data?.message);
      }
    };

    fetchCameras();
  }, [token]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 ml-64 w-full">
        <h1 className="text-3xl font-semibold">📹 Live CCTV Feeds</h1>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {cameras.map((camera) => (
            <div key={camera._id} className="bg-gray-200 p-3 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{camera.name}</h3>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    camera.status === "active" ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {camera.status.toUpperCase()}
                </span>
              </div>

              {/* Render YouTube embed if applicable */}
              {isYouTubeUrl(camera.rtsp_url) ? (
                <iframe
                  className="w-full h-64 mt-2 rounded"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    camera.rtsp_url
                  )}?autoplay=1`}
                  title={camera.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  src={camera.rtsp_url}
                  controls
                  className="w-full h-64 mt-2 rounded"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveFeed;
