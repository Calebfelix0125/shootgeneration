const todoService = require("../services/TodoServices.js");

// CREATE Todo
exports.createTodo = async (req, res) => {
  const { title, description, dueDate, userId } = req.body;
  try {
    const result = await todoService.createTodo(
      title,
      description,
      dueDate,
      userId
    );
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// READ Todos by User
exports.getTodosByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const todos = await todoService.getTodosByUser(userId);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// UPDATE Todo
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const result = await todoService.updateTodo(id, updates);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// DELETE Todo
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await todoService.deleteTodo(id);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
