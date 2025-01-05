const express = require('express');
const { registerUser } = require('../controllers/registerController');

const router = express.Router();

// register
router.post("/", registerUser);

module.exports = router;