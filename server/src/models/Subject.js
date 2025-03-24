// models/Subject.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define the Subject model
const Subject = sequelize.define(
  "Subject",
  {
    subject_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "subjects",
    timestamps: false,
  }
);

module.exports = Subject;
