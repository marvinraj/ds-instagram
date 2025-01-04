const express = require('express');
const { getAllPosts, createPost, upload } = require('../controllers/postControllers')

const router = express.Router();

router.get("/", getAllPosts); // view all posts
router.post("/", upload.single('image'), createPost); // create new posts

module.exports = router;