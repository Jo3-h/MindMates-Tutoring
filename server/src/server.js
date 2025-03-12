// src/server.js

const dotenv = require("dotenv");
const app = require("./app");
const logger = require("./config/logger");
const PORT = process.env.PORT || 3000;

// Initialise environment variables
dotenv.config({ path: "src/.env" });

// Start the server
app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
