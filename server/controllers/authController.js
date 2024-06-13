const bcrypt = require("bcrypt");
const passport = require("passport");
const pool = require("../db");
const { addNewHealthCheck } = require("./sharedController");
const gun = require("../gun");

async function register(req, res) {
  const { hostName, email, password, password2 } = req.body;
  if (password !== password2) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await pool.query(
      "SELECT * FROM authentication WHERE email = $1",
      [email]
    );

    if (user.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    await pool.query(
      "INSERT INTO authentication (host_name, email, password) VALUES ($1, $2, $3) RETURNING id",
      [hostName, email, hashedPassword]
    );

    await addNewHealthCheck(email, hostName);
    gun.get("users").set({ hostName, email, hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(500).send("Server Error");
  }
}

async function login(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.status(200).json({
        message: "Logged in successfully",
        user: {
          id: user.id,
          host_name: user.host_name,
          email: user.email,
        },
      });
    });
  })(req, res, next);
}

async function logout(req, res) {
  req.logout(() => {
    req.flash("success_msg", "You have logged out successfully");
    res.status(200).json({ message: "Logged out successfully" });
  });
}

async function updateHostname(req, res) {
  const { hostName, email } = req.body;

  try {
    const { rows } = await pool.query(
      "UPDATE authentication SET host_name = $1 WHERE email = $2 RETURNING *",
      [hostName, email]
    );

    if (rows.length > 0) {
      gun.get("healthChecks").get(email).put({ hostName });
      res.json(rows[0]);
    } else {
      res.status(404).json({ msg: "Metric not found" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

module.exports = { login, register, logout, updateHostname };
