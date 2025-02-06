const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { Server } = require("socket.io");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("Client connected to WebSocket");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

// Export io instance
module.exports = { app, io };

// Import Routes
const authRoutes = require("./routes/authRoutes");
const cameraRoutes = require("./routes/cameraRoutes");
const aiRoutes = require("./routes/aiRoutes");
const incidentRoutes = require("./routes/incidentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/camera", cameraRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/incidents", incidentRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
