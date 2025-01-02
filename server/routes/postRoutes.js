const express = require('express');
const { getAllPosts, createPost } = require('../controllers/postControllers')

const router = express.Router();

router.get("/", getAllPosts); // view all posts
router.post("/", createPost); // create new posts

module.exports = router;