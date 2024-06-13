const express = require("express");
const router = express.Router();

const healthController = require("../controllers/healthCheckController");

// Routes for general operations
router.get("/", healthController.getAll); 
router.post("/addNew", healthController.addNew);
router.get("/:id", healthController.getById);
router.delete("/:id", healthController.deleteById);

// Routes for email-specific operations
router.post("/email", healthController.getByEmail);
router.put("/email", healthController.updateByEmail);
router.delete("/email", healthController.deleteByEmail);

module.exports = router;
