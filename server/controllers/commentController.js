const db = require('../config/db');

// function 1 - GET ALL COMMENTS ON A SPECIFIC POST
const getCommentsByPostId = (req, res) => {
    const postId = req.params.postId; // Extract the post ID from the URL

    // sql query to fetch all comments for the given post ID
    const q = `
        SELECT 
            comments.id AS comment_id, 
            comments.content, 
            comments.user_id, 
            users.username
        FROM comments
        JOIN users ON comments.user_id = users.id
        WHERE comments.post_id = ?
        ORDER BY comments.id ASC`;

    db.query(q, [postId], (err, data) => {
        if (err) {
            console.error("Error fetching comments:", err);
            return res.status(500).send(err);
        }
        return res.status(200).json(data);
    });
};

// function 2 - ADD A COMMENT ON A SPECIFIC POST
const addComment = (req, res) => {
    const { user_id, content } = req.body;
    const postId = req.params.postId;

    // sql query to insert a new comment
    const q = `INSERT INTO comments (user_id, post_id, content) VALUES (?, ?, ?)`;
    // user_id -- id of user addding the comment
    // post_id -- the id of the post to which the comment is being added
    // content -- the text content of the comment

    const values = [user_id, postId, content];

    db.query(q, values, (err, data) => {
        if (err) {
            console.error("Error adding comment:", err);
            return res.status(500).send(err);
        }
        return res.status(201).json({ message: 'Comment added successfully', commentId: data.insertId });
    });
};

module.exports = { getCommentsByPostId, addComment };
