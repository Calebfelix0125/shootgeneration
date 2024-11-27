const express = require("express");
const router = express.Router();
const todoController = require("../controller/TodoController.js");

// Route untuk CREATE Todo
router.post("/", todoController.createTodo);

// Route untuk READ Todos berdasarkan userId
router.get("/:userId", todoController.getTodosByUser);

// Route untuk UPDATE Todo berdasarkan ID
router.put("/:id", todoController.updateTodo);

// Route untuk DELETE Todo berdasarkan ID
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
