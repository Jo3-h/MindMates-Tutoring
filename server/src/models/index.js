// models/index.js

const sequelize = require("../config/database");
const User = require("./User");
const Location = require("./Location");
const Subject = require("./Subject");
const Booking = require("./Booking");
const BookingUser = require("./BookingUser");
const Availability = require("./Availability");

// Define the relationships between the models
Booking.belongsTo(User, { foreignKey: "user_id" });
Booking.belongsTo(Location, { foreignKey: "location_id" });
Booking.belongsTo(Subject, { foreignKey: "subject_id" });
BookingUser.belongsTo(User, { foreignKey: "user_id" });
BookingUser.belongsTo(Booking, { foreignKey: "booking_id" });

module.exports = {
  sequelize,
  User,
  Location,
  Subject,
  Booking,
  BookingUser,
  Availability,
};
