const express = require('express');
const connectDB = require('./config/db');

require('dotenv').config(); // loads the env variables

const app = express()
const port = process.env.PORT || 5000; // store port from env variable

app.get('/', (req, res) => {
    res.send("Hello world");
});

// db connection
connectDB.connect((err) => {
    if (err){
        console.log("error connecting to mysql");
    } else {
        console.log("successful connection with mysql!");
    }
})

app.listen(port, () => {
    console.log("server running at http://localhost:" + port);
});