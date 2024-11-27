const userService = require("../services/UserServices.js");
const bcrypt = require("bcrypt");
const User = require("../models/UserModels.js");

// CREATE User
exports.createUser = async (req, res) => {
  let { name, email, password } = req.body;

  name = name.trim();
  email = email.trim();
  password = password.trim();

  try {
    if (name === "" || email === "" || password === "") {
      return res.json({
        status: "FAILED",
        message: "Please fill in all required fields.",
      });
    }

    if (!/^[a-zA-Z]*$/.test(name)) {
      return res.json({
        status: "FAILED",
        message: "Name should only contain alphabetic characters.",
      });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.json({
        status: "FAILED",
        message: "Invalid email address.",
      });
    }

    if (password.length < 8) {
      return res.json({
        status: "FAILED",
        message: "Password must be at least 8 characters",
      });
    }

    // Periksa apakah email sudah ada
    const user = await User.findOne({ email });
    if (user) {
      res.json({
        status: "FAILED",
        message: "Email already exists",
      });
    } else {
      // Hash password
      const saltRound = 10;
      const hashedPassword = await bcrypt.hash(password, saltRound);
      await userService.createUser(name, email, hashedPassword);

      res.json({
        status: "SUCCESS",
        message: "Signup successfully",
      });
    }
  } catch (err) {
    console.error("Error in createUser:", err);
    res.status(500).send({ error: err.message });
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.body;

  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    return res.json({
      status: "FAILED",
      message: "Please fill in all required fields.",
    });
  }

  try {
    const data = await userService.getUserByEmail(email); // Periksa apakah fungsi ini mengembalikan dokumen

    if (data.length) {
      // data.password akan tersedia jika `data` tidak null
      const result = await bcrypt.compare(password, data.password);

      if (result) {
        return res.json({
          status: "SUCCESS",
          message: "Login successfully",
          user: {
            id: data.id,
            name: data.name,
            email: data.email,
          }, // Hanya kirim informasi yang diperlukan (jangan kirim password)
        });
      } else {
        return res.json({
          status: "FAILED",
          message: "Invalid password",
        });
      }
    } else {
      return res.json({
        status: "FAILED",
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).send({ error: error.message });
  }
};

// READ all Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// UPDATE User
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const result = await userService.updateUser(id, name, email, password);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// DELETE User
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUser(id);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
