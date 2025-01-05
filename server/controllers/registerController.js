const db = require('../config/db');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if username or email already exists
    const checkQuery = `SELECT * FROM users WHERE username = ? OR email = ?`;
    db.query(checkQuery, [username, email], async (err, data) => {
        if (err) return res.status(500).json({ error: 'Database query error' });
        if (data.length > 0) {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }

        // Insert new user into the database
        const insertQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
        db.query(insertQuery, [username, email, password], (err, result) => {
            if (err) return res.status(500).json({ error: 'Database insertion error' });
            return res.status(201).json({
                message: 'User registered successfully',
                userId: result.insertId,
                username,
                email,
            });
        });
    });
};

module.exports = { registerUser };