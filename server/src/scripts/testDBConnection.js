// scripts/testDBConnection.js

require("dotenv").config(); // Load environment variables at the top
const { Client } = require("pg");
const logger = require("../config/logger");

const connection_details = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // Required for AWS RDS if SSL is enforced
  },
};

logger.info("Testing database connection...");

const client = new Client(connection_details);

const testDBConnection = async () => {
  // Define a timeout for the connection
  const timeout = 5000;
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Connection timeout")), timeout)
  );

  try {
    await Promise.race([client.connect(), timeoutPromise]);
    logger.info("Connected to the database successfully!");
  } catch (error) {
    if (error.message === "Connection timeout") {
      logger.error("Error: Database connection timed out");
    } else {
      logger.error("Error connecting to the database");
      logger.error(error);
    }
  } finally {
    await client.end();
    logger.info("Connection to the database has been closed.");
  }
};

testDBConnection();
