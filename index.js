require("dotenv").config();
const express = require("express");
const app = require("./src/app");
const PORT = 3000;


const pool = require("./src/database");

pool.query("SELECT NOW()")
  .then(result => {
    console.log("PostgreSQL connected:", result.rows[0]);
  })
  .catch(error => {
    console.error("Database connection failed:", error.message);
  });
  
app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`);
})