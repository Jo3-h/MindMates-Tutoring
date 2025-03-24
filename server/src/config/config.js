// config/config.js

// bring in environment variables
require("dotenv").config();

// export the configuration object
module.exports = {
  database: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    name: process.env.DB_NAME || "my_database",
  },
  server: {},
  logging: {
    log_directory: "logs",
    db_log_file: "/db_config.log",
  },
};
