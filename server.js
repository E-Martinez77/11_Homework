const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

const path = require("path");

const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
