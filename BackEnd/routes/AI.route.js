const express = require("express");
const router = express.Router();
const { generateAiPlanner } = require("../controllers/ai.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/ai", generateAiPlanner);

module.exports = router;
