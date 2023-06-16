const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

require("dotenv").config();

app.use(cors());
app.use(express.json());

// Parse JSON bodies for this server
app.use(bodyParser.json());
// Parse URL-encoded bodies for this server
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("./routes//Route"));

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// database
const conn = require("./database/connection");
conn
  .then((db) => {
    if (!db) return process.exit(1);
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server listening on port : `, process.env.PORT);
    });
    app.on("error", (err) =>
      console.log(`Failed to connect with server : ${err}`)
    );
  })
  .catch((error) => {
    console.log(`Connection failed : ${error}`);
  });
