const mysql = require('mysql2');

// Establish database connection
const db = mysql.createConnection({
    host: "localhost",         // Replace with your MySQL server host (e.g., 127.0.0.1)
    user: "root",              // Replace with your MySQL user
    password: "Marvin@010608", // Replace with your MySQL password
    multipleStatements: true   // Allow multiple SQL statements (needed for init.sql)
});

// Export the database connection
module.exports = db;
