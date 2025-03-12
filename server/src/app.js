// src/app.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const logger = require("./config/logger");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } })
);
app.use((err, req, res, next) => {
  logger.error(`Error occurred: ${err.message}`);
  res.status(500).send("Internal Server Error");
});

// Routes
//const userRoutes = require("./routes/userRoutes");
//const adminRoutes = require(".routes/adminRoutes");
//app.use("api/users", userRoutes);
//app.use("api/admin", adminRoutes);

module.exports = app;
