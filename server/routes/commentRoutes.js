const express = require('express');
const { getCommentsByPostId, addComment } = require('../controllers/commentController');

const router = express.Router();

router.get('/:postId', getCommentsByPostId); // view all comments on a specific post
router.post('/:postId', addComment); // add a comment to a specific post

module.exports = router;
