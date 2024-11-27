const Todo = require("../models/TodoModels.js");

// CREATE Todo
exports.createTodo = async (title, description, dueDate, userId) => {
  try {
    const newTodo = new Todo({
      title,
      description,
      dueDate,
      userId,
    });
    await newTodo.save();
    return { message: "Todo created successfully", todo: newTodo };
  } catch (err) {
    throw new Error(err.message);
  }
};

// READ Todos by User ID
exports.getTodosByUser = async (userId) => {
  try {
    const todos = await Todo.find({ userId });
    return todos;
  } catch (err) {
    throw new Error(err.message);
  }
};

// UPDATE Todo
exports.updateTodo = async (id, updates) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedTodo) {
      throw new Error("Todo not found");
    }
    return { message: "Todo updated successfully", todo: updatedTodo };
  } catch (err) {
    throw new Error(err.message);
  }
};

// DELETE Todo
exports.deleteTodo = async (id) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      throw new Error("Todo not found");
    }
    return { message: "Todo deleted successfully" };
  } catch (err) {
    throw new Error(err.message);
  }
};
