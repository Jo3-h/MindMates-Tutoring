// scripts/testDBModels.js

const { name } = require("body-parser");
const logger = require("../config/logger");
const {
  sequelize,
  User,
  Location,
  Subject,
  Booking,
  BookingUser,
  Availability,
} = require("../models");

// log the start of the testing process
logger.info("Running testing on the database models...");

// define the model testing function
const testDBModels = async () => {
  try {
    await sequelize.authenticate();
    logger.info(
      "Connection to the database has been established successfully."
    );

    const testModel = (modelName, model) => {
      if (model) {
        logger.info(`${modelName} model was defined correctly.`);
        logger.info(
          `The ${modelName} model has the following attributes: ${model.rawAttributes}`
        );
      }
    };

    // Test each model
    testModel("User", User);
    testModel("Location", Location);
    testModel("Subject", Subject);
    testModel("Booking", Booking);
    testModel("BookingUser", BookingUser);
    testModel("Availability", Availability);
  } catch (error) {
    logger.error("Error in testing DB models:", {
      message: error?.message || "no error message",
      name: error?.name || "no error name",
    });
  } finally {
    await sequelize.close();
    logger.info("Connection to the database has been closed.");
  }
};

// Run the model testing function
testDBModels();
