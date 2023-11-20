// db/connection.js
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/students-api", {})
  .then(() => {
    console.log("Connection to MongoDB successful");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

module.exports = mongoose;
