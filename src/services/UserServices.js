const User = require("../models/UserModels.js");

// CREATE User
exports.createUser = async (name, email, password) => {
  try {
    const newUser = new User({ name, email, password });
    newUser.save();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getUserByEmail = async (email) => {
  try {
    const users = await User.findOne({ email });
    return users;
  } catch (err) {
    throw new Error(err.message);
  }
};

// READ all Users
exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw new Error(err.message);
  }
};

// UPDATE User
exports.updateUser = async (name, email, password) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { name, email, password },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return { message: "User updated successfully", user: updatedUser };
  } catch (err) {
    throw new Error(err.message);
  }
};

// DELETE User
exports.deleteUser = async (id) => {
  try {
    const deletedUser = await User.findOneAndDelete({ id });
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully" };
  } catch (err) {
    throw new Error(err.message);
  }
};
