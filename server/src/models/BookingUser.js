// models/BookingUser.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define the BookingUser model
const BookingUser = sequelize.define(
  "BookingUser",
  {
    booking_user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "booking_users",
    timestamps: false,
  }
);

module.exports = BookingUser;
