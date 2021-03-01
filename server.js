const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

const path = require("path");

const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.get("notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
