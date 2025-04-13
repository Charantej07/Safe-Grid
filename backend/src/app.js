const express = require("express");
const http = require("http");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { Server } = require("socket.io");

dotenv.config();
connectDB();

console.log("🔹 AWS Access Key:", process.env.AWS_ACCESS_KEY_ID || "NOT SET");
console.log(
  "🔹 AWS Secret Key:",
  process.env.AWS_SECRET_ACCESS_KEY ? "SET" : "NOT SET"
);
console.log("🔹 AWS Bucket:", process.env.AWS_BUCKET_NAME || "NOT SET");
console.log("🔹 AWS Region:", process.env.AWS_REGION || "NOT SET");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests
  message: "Too many requests from this IP, please try again later.",
});

const bodyParser = require("body-parser");

const morgan = require("morgan");
const winston = require("winston");
const compression = require("compression");
const helmet = require("helmet");
const { exec } = require("child_process");

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: "logs/api.log" }),
    new winston.transports.Console(),
  ],
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Ensure form-data is parsed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(limiter);
app.use(compression());
app.use(helmet());
app.use(
  morgan("combined", { stream: { write: (message) => logger.info(message) } })
);

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
