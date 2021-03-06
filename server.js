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
  //   console.log(read);
  res.json(read);
});

app.post("/api/notes", function (req, res) {
  //get info from db
  const pageContent = req.body;
  const read2 = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  //   const last = read2.length > 0 ? read2[read2.length - 1] : null; //gets last element in database, returns null if empty
  //   const id = last !== null ? last.id++ : 1; //uuidv4
  const id = uuidv4();
  const newDatabase = [...read2, { ...pageContent, id }];

  fs.writeFileSync("./db/db.json", JSON.stringify(newDatabase), "utf8");

  res.json(newDatabase);
});

app.delete("/api/notes/:id", function (req, res) {
  const id = req.params.id;

  const read3 = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

  const deleteTest = read3.splice(id);

  deleteTest;

  fs.writeFileSync(
    "./db/db.json",
    JSON.stringify(fs.readFileSync("./db/db.json", "utf8"))
  );
  //read the file, update array pulled from the file, splice/clear(), and remove the item from the array and write it back to the file.
  //find index of what was clicked and splice it out.

  res.send("Got a DELETE request at /api/notes");
});

// app.delete('/user', function (req, res) {
//   res.send('Got a DELETE request at /user')
// })

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

//get route, post, and delete

// app.delete("/api/notes", (req, res) => res.json(data));

// app.get("./db/db.json", (req, res) => res.json(data));

app.get("/data", function (req, res) {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
