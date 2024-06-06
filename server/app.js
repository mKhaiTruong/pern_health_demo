const express = require("express");
const path = require("path");
const cors = require("cors");
const healthRouter = require("./routes/health.router");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests -> parsed data in req.body
app.use(express.static(path.join(__dirname, "client/build")));

// Routes
app.use("/", healthRouter);

// Catch-all handler to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
