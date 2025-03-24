// models/Location.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define the Location model
const Location = sequelize.define(
  "Location",
  {
    location_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "locations",
    timestamps: false,
  }
);

module.exports = Location;
