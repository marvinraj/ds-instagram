const express = require('express');
const postRoutes = require('./routes/postRoutes')
const connectDB = require('./config/db');

require('dotenv').config(); // loads the env variables

const app = express()
const port = process.env.PORT || 5000; // store port from env variable

// middlewares
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");  // this is to allow all origins
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");  // this is to allow GET, POST, PUT, DELETE methods
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  // this is to allow specific headers
    next();
});
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // parse the incoming requests with JSON payloads


app.get('/', (req, res) => {
    res.send("Hello world");
});

app.use("/api/posts", postRoutes)

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