const pool = require("./db");
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const osu = require("node-os-utils");
const { cpu, mem } = osu;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests -> parsed data in req.body

app.use(express.static(path.join(__dirname, "client/build")));

// get system metrics
const getSystemMetrics = async () => {
  const cpuUsage = await cpu.usage();
  const memUsage = await mem.info();
  const responseTime = Math.random(); // Mock response time

  return {
    status: cpuUsage < 80 ? "Healthy" : "Unhealthy",
    response_time: responseTime,
    cpu_usage: cpuUsage,
    memory_usage: memUsage.usedMemMb,
  };
};

//////ROUTES////////

//get all health checks
app.get("/health", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM healthdb ORDER BY timestamp DESC"
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
  }
});

//get a health check by id
app.get("/metrics/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("SELECT * FROM healthdb WHERE id = $1", [
      id,
    ]);

    if (response.rows.length === 0) {
      return res.status(404).send("Metric not found");
    }

    res.json(response.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

//create a new health check
app.post("/metrics", async (req, res) => {
  try {
    const metrics = await getSystemMetrics();
    const { hostName } = req.body;
    if (!hostName) return res.status(400).send("Host name is required");

    const { status, response_time, cpu_usage, memory_usage } = metrics;

    const response = await pool.query(
      "INSERT INTO healthdb (host_name, status, response_time, cpu_usage, memory_usage, timestamp) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [hostName, status, response_time, cpu_usage, memory_usage, new Date()]
    );

    res.json(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//update a health check by id
app.put("/metrics/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { hostName } = req.body;
    if (!hostName) return res.status(400).send("Host name is required");

    const result = await pool.query(
      "UPDATE healthdb SET host_name = $1 WHERE id = $2 RETURNING *",
      [hostName, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Metric not found");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

//delete a health check by id
app.delete("/metrics/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM healthdb WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Metric not found");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

// Catch-all handler to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

//start server at 9000
app.listen(9000, () => {
  console.log(`Server running on port localhost:9000`);
});
