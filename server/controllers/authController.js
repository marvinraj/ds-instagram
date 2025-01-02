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

module.exports = { getAuth };
