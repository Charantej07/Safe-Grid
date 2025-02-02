const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

//Middleware
app.use(express.json());
app.use(cors());

//connect to MongoDB

const connectDB = require('./config/db');
connectDB();

//Import Routes

//Use Routes

//start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
