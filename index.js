const express = require("express");
const { connectToDB } = require("./src/config/db.js");
const userRoutes = require("./src/routes/userRoutes.js");
const bodyParser = require("body-parser");
const todoRoutes = require("./src/routes/TodoRoutes.js");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT;
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Use user routes
app.use("/user", userRoutes);
// app.use("/todos", todoRoutes);

connectToDB();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
