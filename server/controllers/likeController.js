const db = require('../config/db');

// Function to like a post
const likePost = (req, res) => {
    const { user_id } = req.body;
    const postId = req.params.postId;

    const q = `INSERT INTO likes (user_id, post_id) VALUES (?, ?)`;

    db.query(q, [user_id, postId], (err, data) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'User has already liked this post.' });
            }
            console.error('Error liking the post:', err);
            return res.status(500).send(err);
        }
        return res.status(201).json({ message: 'Post liked successfully' });
    });
};

// Function to unlike a post
const unlikePost = (req, res) => {
    const { user_id } = req.body;
    const postId = req.params.postId;

    const q = `DELETE FROM likes WHERE user_id = ? AND post_id = ?`;

    db.query(q, [user_id, postId], (err, data) => {
        if (err) {
            console.error('Error unliking the post:', err);
            return res.status(500).send(err);
        }
        return res.status(200).json({ message: 'Post unliked successfully' });
    });
};

// Optional: Check if user has liked a post
const checkIfLiked = (req, res) => {
    const { user_id } = req.body;
    const postId = req.params.postId;

    const q = `SELECT * FROM likes WHERE user_id = ? AND post_id = ?`;

    db.query(q, [user_id, postId], (err, data) => {
        if (err) {
            console.error('Error checking like status:', err);
            return res.status(500).send(err);
        }
        return res.status(200).json({ liked: data.length > 0 });
    });
};

// Function to get likes count for a specific post
const getLikesCount = (req, res) => {
    const postId = req.params.postId;

    const q = `SELECT COUNT(*) AS likes_count FROM likes WHERE post_id = ?`;

    db.query(q, [postId], (err, data) => {
        if (err) {
            console.error('Error fetching likes count:', err);
            return res.status(500).send(err);
        }
        return res.status(200).json({ likes_count: data[0].likes_count });
    });
};

module.exports = { likePost, unlikePost, checkIfLiked, getLikesCount };