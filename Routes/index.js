// Import external package
const express = require("express");
const router = express.Router();

// Import Internal Files
const UserController = require('../Controllers/UserController');
const AdminController = require('../Controllers/AdminController');

// Routes
router.post('/registerUser', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/updateIPCLaw', AdminController.updateIPCLaw);
router.get('/getIPCLaws', AdminController.getIPCLaws);

module.exports = router;