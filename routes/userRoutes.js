const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// Contains route definitions that map HTTP methods and endpoints to specific controller functions.
// userRoutes.js: Contains routes for user operations like registration, login, etc.

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;