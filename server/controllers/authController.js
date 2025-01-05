const db = require('../config/db');

// logic to handle login authentication
const getAuth = (req, res) => {
    const { email, password } = req.body;
    const q = "SELECT email, username, id FROM users WHERE email = ? AND password = ?";

    db.query(q, [email, password], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "database error" });
        }
        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(401).json({ message: "wrong email/password combination" });
        }
    });
};

// function to reset password
const resetPassword = (req, res) => {
    const { email, newPassword } = req.body;

    // Check if the email exists in the database
    const checkQuery = `SELECT * FROM users WHERE email = ?`;
    db.query(checkQuery, [email], (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: "Email not found in the database" });
        }

        // Update the password
        const updateQuery = `UPDATE users SET password = ? WHERE email = ?`;
        db.query(updateQuery, [newPassword, email], (err, result) => {
            if (err) {
                console.error("Error updating password:", err);
                return res.status(500).json({ error: "Failed to update password" });
            }

            return res.status(200).json({ message: "Password reset successfully" });
        });
    });
};

module.exports = { getAuth, resetPassword };
