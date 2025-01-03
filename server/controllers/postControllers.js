const multer = require('multer');
const path = require('path');
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


// Configure Multer to store uploaded images in the `uploads` directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for uploads
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    },
});

const upload = multer({ storage });

// function 2 - CREATE A NEW POST
const createPost = (req, res) => {
    const { user_id, caption } = req.body;
    const image = req.file ? req.file.path.replace(/\\/g, '/') : null; // Get the image file path

    if (!image) {
        return res.status(400).json({ message: 'Image is required' });
    }

    // SQL query to insert the post into the database
    const q = `
        INSERT INTO posts (user_id, image, caption) 
        VALUES (?, ?, ?)`;

    const values = [user_id, image, caption];

    db.query(q, values, (err, data) => {
        if (err) {
            console.error('Error creating post:', err);
            return res.status(500).send(err);
        }
        return res.status(201).json({ message: 'Post created successfully', postId: data.insertId });
    });
};

// function 3 - DELETE A POST -- later

// function 4 - like a post -- later


module.exports = { getAllPosts, createPost, upload };