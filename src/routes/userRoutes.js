const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController.js");

// Route untuk CREATE
router.post("/signup", userController.createUser);

router.post("/login", userController.login);

// Route untuk READ all users
router.get("/", userController.getAllUsers);

// Route untuk UPDATE berdasarkan 'id'
router.put("/:id", userController.updateUser);

// Route untuk DELETE berdasarkan 'id'
router.delete("/:id", userController.deleteUser);

module.exports = router;
