const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

const PORT = process.env.PORT || 8080;

const path = require("path");

const fs = require("fs");

const data = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/notes", function (req, res) {
  const read = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(read);
});

app.post("/api/notes", function (req, res) {
  const pageContent = req.body;
  const read2 = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const id = uuidv4();
  const newDatabase = [...read2, { ...pageContent, id }];

  fs.writeFileSync("./db/db.json", JSON.stringify(newDatabase), "utf8");

  res.json(newDatabase);
});

app.delete("/api/notes/:id", function (req, res) {
  const id2 = req.params.id;

  const read3 = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

  for (let i = 0; i < read3.length; i++) {
    if (read3[i].id === id2) {
      read3.splice(i, 1);
    }
  }

  fs.writeFileSync("./db/db.json", JSON.stringify(read3), "utf8");
  res.json(read3);
});

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("/data", function (req, res) {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
