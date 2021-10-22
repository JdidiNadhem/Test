const express = require("express");
const app = express();

// Allow cross origin  middleware

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Import DATABASE CONNEXION
const connectDB = require("./Config/connectDB");
// middleware global
app.use(express.json());
// Router
app.use("/api/user", require("./Router/user.api"));


// Global envirenement
require("dotenv").config(); 

// DATABASE CONNEXION
connectDB();
// Start server
// PORT
const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server is Running on PORT ${PORT}`);
});