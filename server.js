const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Simple array to hold milestones
let milestones = [];

// Endpoint to get milestones
app.get("/api/milestones", (req, res) => {
  res.json(milestones);
});

// Endpoint to add a milestone
app.post("/api/milestones", (req, res) => {
  const { title, date } = req.body;
  milestones.push({ title, date });
  res.status(201).json({ message: "Milestone added!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
