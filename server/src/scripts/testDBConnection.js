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

console.log("🔌 Testing database connection...");
console.log("🔌 Connection details:", connection_details);
logger.info("Testing database connection...");

const client = new Client(connection_details);

const testDBConnection = async () => {
  try {
    await client.connect();
    logger.info("Connected to the database successfully!");
  } catch (error) {
    logger.error("Error connecting to the database");
    logger.error(error);
  } finally {
    await client.end();
  }
};

testDBConnection();
