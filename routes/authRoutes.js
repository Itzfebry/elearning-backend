const express = require("express");
const { generateToken } = require("../controllers/authControllers");

const router = express.Router();

// Route untuk generate token
router.get("/generate-token", generateToken);

module.exports = router;
