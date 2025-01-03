const express = require('express');
const { likePost, unlikePost, checkIfLiked, getLikesCount } = require('../controllers/likeController');

const router = express.Router();

// Route to like a post
router.post('/:postId/like', likePost);

// Route to unlike a post
router.delete('/:postId/unlike', unlikePost);

// Optional: Route to check if a user has liked a post
router.post('/:postId/check', checkIfLiked);

// Route to get likes count for a post
router.get('/:postId/likes-count', getLikesCount);

module.exports = router;