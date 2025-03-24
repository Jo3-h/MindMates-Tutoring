// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Define routes for CRUD operations on users
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:user_id", userController.getUserByID);
router.put("/:user_id", userController.updateUser);
router.delete("/:user_id", userController.deleteUser);

module.exports = router;
