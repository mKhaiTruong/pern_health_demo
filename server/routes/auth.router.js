const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  updateHostname,
} = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/update", updateHostname);

module.exports = router;
