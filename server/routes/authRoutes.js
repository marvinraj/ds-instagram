const express = require('express');
const { getAuth } = require('../controllers/authController');

const router = express.Router();

// login
router.post("/", getAuth);

module.exports = router;