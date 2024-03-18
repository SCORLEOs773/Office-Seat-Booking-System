const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:4200" })); // Allow requests from the Angular application's origin
app.use(express.json());

// Sample data - Replace this with your database or other data source
let users = [];

// Routes
app.post("/register", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  console.log("New user registered:", newUser);
  res.status(201).json({ message: "User registered successfully" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
