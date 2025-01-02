const db = require('../config/db');

// function 1 - DISPLAY ALL POSTS
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
};

// function 2 - CREATE A NEW POST
const createPost = (req, res) => {
    // SQL query to insert a new post
    const q = `
        INSERT INTO posts (user_id, image, caption) 
        VALUES (?, ?, ?)`;

    // Values from the request body
    const values = [
        req.body.user_id,   // ID of the user creating the post
        req.body.image,     // Path or URL to the image
        req.body.caption    // Caption for the post
    ];

    // Execute the query
    db.query(q, values, (err, data) => {
        if (err) {
            console.error("Error creating post:", err);
            return res.status(500).send(err);
        }
        return res.status(201).send({ message: 'Post created successfully', postId: data.insertId });
    });
};

// function 3 - DELETE A POST -- later

// function 4 - like a post -- later


module.exports = { getAllPosts, createPost };