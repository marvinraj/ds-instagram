const db = require('../config/db');

const getAllPosts = (req, res) => {
    // sql query to get postid, userid, image, caption, username
    const q = `
        SELECT 
            posts.id AS post_id,
            posts.user_id,
            posts.image AS image_path,
            posts.caption,
            users.username
        FROM posts
        JOIN users ON posts.user_id = users.id
        ORDER BY posts.id DESC`;

    db.query(q, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(data);
    });
}

module.exports = { getAllPosts };