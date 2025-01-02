const express = require('express');
const { getAllPosts } = require('../controllers/postControllers')

const router = express.Router();

router.get("/", getAllPosts);

module.exports = router;