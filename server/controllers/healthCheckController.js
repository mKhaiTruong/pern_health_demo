const pool = require("../db");
const osu = require("node-os-utils");
const { cpu, mem } = osu;

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

const healthController = {
  getAll: async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM healthdb ORDER BY timestamp DESC"
      );
      res.json(rows);
    } catch (error) {
      console.error("Error in getAll:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  getById: async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM healthdb WHERE id = $1",
        [req.params.id]
      );
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ msg: "Metric not found" });
      }
    } catch (error) {
      console.error("Error in getById:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  create: async (req, res) => {
    try {
      const metrics = await getSystemMetrics();
      const { status, response_time, cpu_usage, memory_usage } = metrics;
      const { hostName } = req.body;
      if (!hostName) return res.status(400).send("Host name is required");

      const sql =
        "INSERT INTO healthdb (host_name, status, response_time, cpu_usage, memory_usage, timestamp) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
      const { rows } = await pool.query(sql, [
        hostName,
        status,
        response_time,
        cpu_usage,
        memory_usage,
        new Date(),
      ]);

      res.json(rows[0]);
    } catch (error) {
      console.error("Error in create:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  updateById: async (req, res) => {
    try {
      const { hostName } = req.body;
      if (!hostName) return res.status(400).send("Host name is required");

      const sql =
        "UPDATE healthdb SET host_name = $1 WHERE id = $2 RETURNING *";
      const { rows } = await pool.query(sql, [hostName, req.params.id]);

      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ msg: "Metric not found" });
      }
    } catch (error) {
      console.error("Error in updateById:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  deleteById: async (req, res) => {
    try {
      const sql = "DELETE FROM healthdb WHERE id = $1 RETURNING *";
      const { rows } = await pool.query(sql, [req.params.id]);

      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ msg: "Metric not found" });
      }
    } catch (error) {
      console.error("Error in deleteById:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
};

module.exports = healthController;
