// src/server.js

const dotenv = require("dotenv");
const app = require("./app");
const PORT = process.env.PORT || 3000;

// Initialise environment variables
dotenv.config();

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
