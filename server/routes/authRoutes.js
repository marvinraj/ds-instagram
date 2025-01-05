const express = require('express');
const { getAuth, resetPassword } = require('../controllers/authController');

const router = express.Router();

// login
router.post("/", getAuth);
// reset
router.post("/reset-password", resetPassword);

module.exports = router;