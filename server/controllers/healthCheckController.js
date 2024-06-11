const pool = require("../db");
const { updateHostname: updateAuthHostname } = require("./authController");
const { addNewHealthCheck } = require("./sharedController");

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
  addNew: async (req, res) => {
    try {
      const { hostName, email } = req.body;
      if (!hostName) return res.status(400).send("Host name is required");
      if (!email) return res.status(400).send("Email is required");
      
      const newHealthCheck = await addNewHealthCheck(email, hostName);
      res.json(newHealthCheck);
    } catch (error) {
      console.error("Error in addNew:", error);
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

  getByEmail: async (req, res) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM healthdb WHERE email = $1",
        [req.body.email]
      );
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ msg: "Metric not found" });
      }
    } catch (error) {
      console.error("Error in getByEmail:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  updateByEmail: async (req, res) => {
    try {
      const { hostName, email } = req.body;
      if (!hostName) return res.status(400).send("Host name is required");
      if (!email) return res.status(400).send("Email is required");

      const sql =
        "UPDATE healthdb SET host_name = $1 WHERE email = $2 RETURNING *";
      const { rows } = await pool.query(sql, [hostName, email]);

      if (rows.length > 0) {
        if (!req.isRecursive) {
          req.isRecursive = true;
          await updateAuthHostname(req, res);
        } else {
          res.json(rows[0]);
        }
      } else {
        res.status(404).json({ msg: "Metric not found" });
      }
    } catch (error) {
      console.error("Error in updateByEmail:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  deleteByEmail: async (req, res) => {
    try {
      const sql = "DELETE FROM healthdb WHERE email = $1";
      const { rows } = await pool.query(sql, [req.body.email]);

      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ msg: "Metric not found" });
      }
    } catch (error) {
      console.error("Error in deleteByEmail:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  },
};

module.exports = healthController;
