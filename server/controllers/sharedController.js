const pool = require("../db");
const osu = require("node-os-utils");
const { cpu, mem } = osu;

const getSystemMetrics = async () => {
  const cpuUsage = await cpu.usage();
  const memUsage = await mem.info();
  const responseTime = Math.random();

  return {
    status: cpuUsage < 80 ? "Healthy" : "Unhealthy",
    response_time: responseTime,
    cpu_usage: cpuUsage,
    memory_usage: memUsage.usedMemMb,
  };
};

const addNewHealthCheck = async (email, hostName) => {
  const metrics = await getSystemMetrics();
  const { status, response_time, cpu_usage, memory_usage } = metrics;

  try {
    const { rows } = await pool.query(
      "INSERT INTO healthdb (email, host_name, status, response_time, cpu_usage, memory_usage, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        email,
        hostName,
        status,
        response_time,
        cpu_usage,
        memory_usage,
        new Date(),
      ]
    );
    return rows[0];
  } catch (error) {
    console.error("Error in addNewHealthCheck:", error);
    throw error;
  }
};

module.exports = {
  addNewHealthCheck,
};
