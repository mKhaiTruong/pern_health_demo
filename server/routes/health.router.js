const express = require("express")
const router = express.Router()

const healthController = require('../controllers/healthCheckController')

router.get("/health", healthController.getAll)
router.get("/metrics/:id", healthController.getById)
router.post("/metrics", healthController.create)
router.put("/metrics/:id", healthController.updateById)
router.delete("/metrics/:id", healthController.deleteById)

module.exports = router