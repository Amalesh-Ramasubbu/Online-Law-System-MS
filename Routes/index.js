// Import external package
const express = require("express");
const router = express.Router();

// Import Internal Files
const UserController = require('../Controllers/UserController');

// Routes
router.post('/registerUser', UserController.registerUser);

module.exports = router;