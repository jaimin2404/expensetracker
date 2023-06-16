const mongoose = require("mongoose");
const conn = mongoose
  .connect(process.env.DB_URL)
  .then((db) => {
    console.log("Database connected");
    return db;
  })
  .catch((err) => {
    console.log("Error");
  });

module.exports = conn;
