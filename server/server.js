const express = require('express');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');
const registerRoutes = require('./routes/registerRoutes');
const likeRoutes = require('./routes/likeRoutes');
const db = require('./config/db');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow HTTP methods
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/posts", likeRoutes);
app.use('/uploads', express.static('uploads'));

// Database setup
const setupDatabase = () => {
    const initSqlPath = path.join(__dirname, 'config', 'init.sql');
    const initSql = fs.readFileSync(initSqlPath, 'utf8');

    db.query(initSql, (err) => {
        if (err) {
            console.error('Error setting up the database:', err);
            process.exit(1);
        } else {
            console.log('Database and tables created successfully!');
        }
    });
};

// Connect to database and setup if needed
db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
    } else {
        console.log("Successfully connected to MySQL!");
        setupDatabase(); // Automatically set up the database
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
