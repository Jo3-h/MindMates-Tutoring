// scripts/testDBModels.js

const logger = require("../config/logger");
const { sequelize } = require("../models"); // Import only sequelize to dynamically fetch models
const { DataTypes } = require("sequelize");
const fs = require("fs");
const config = require("../config/config");
const { set } = require("../app");

// Log the start of the testing process
logger.info("Running database model validation...");
console.log("Config: ", config["logging"]);

// Define a timeout to close the connection
const timeoutDatabaseConnection = (promise, ms) => {
  const timeout = new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Connection timeout")), ms)
  );
  return Promise.race([promise, timeout]);
};

// Define the model validation function
const validateModels = async () => {
  try {
    await timeoutDatabaseConnection(sequelize.authenticate(), 10000);
    logger.info(
      "Connection to the database has been established successfully."
    );

    // Get all table names from the database
    const dbTables = await sequelize.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public';
    `);
    const tableNames = dbTables.flat();

    // Get all models from the sequelize instance
    const models = sequelize.models;
    const modelDetailsList = [];
    for (const model in models) {
      // build modelObject in desired format for comparison between model and database
      const modelInstance = models[model];
      const modelObject = {
        ModelName: modelInstance.name.toUpperCase(),
        ModelDetails: {
          tableName: modelInstance.getTableName(),
          present: [true, tableNames.includes(modelInstance.getTableName())],
          columnDetails: [],
        },
      };

      // get column details from the database
      const dbColumns = await sequelize.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_name = '${modelInstance.getTableName()}';`);
      const dbColumnNames = dbColumns[0].map((column) => column.column_name);

      // Get model columns and use to build modelObject['ModelDetails']['columnDetails']
      const modelColumns = modelInstance.rawAttributes;
      for (const column in modelColumns) {
        const dbColumn = dbColumns[0].find(
          (dbCol) => dbCol.column_name === modelColumns[column]["fieldName"]
        );
        const columnObject = {
          columnName: column,
          present: [
            true,
            dbColumnNames.includes(modelColumns[column]["fieldName"]),
          ],
          dataType: [
            modelColumns[column]["type"],
            dbColumn ? dbColumn.data_type : "",
          ],
          allowNull: [
            modelColumns[column]["allowNull"],
            dbColumn ? dbColumn.is_nullable : "",
          ],
          defaultValue: [
            modelColumns[column]["defaultValue"],
            dbColumn ? dbColumn.column_default : "",
          ],
        };
        modelObject["ModelDetails"]["columnDetails"].push(columnObject);
      }
      modelDetailsList.push(modelObject);
    }

    // Convert modelDetailsList to a JSON string with pretty formatting
    const jsonString = JSON.stringify(modelDetailsList, null, 2);
    // Write the JSON string to a file
    fs.writeFileSync(
      `${config["logging"]["log_directory"]}/modelDetailsList.json`,
      jsonString,
      "utf8"
    );
    logger.info("Model details have been written to modelDetailsList.json");
  } catch (error) {
    logger.error("Error in database model validation:", error);
  } finally {
    await sequelize.close();
    logger.info("Connection to the database has been closed.");
  }
};

// Run the model validation function
validateModels();
