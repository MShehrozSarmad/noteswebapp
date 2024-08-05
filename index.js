const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
//setting up for parser form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//setting up public static files
app.use(express.static(path.join(__dirname, "public")));
//setting up ejs as view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    res.render("index", { files: files });
  });
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.note,
    (err) => res.redirect("/")
  );
});

app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    res.render('show', {data: filedata, title: req.params.filename.split('.')[0]})
  });
});

app.post('/rename', (req, res) => {
  fs.rename(`./files/${req.body.prevName}`, `./files/${req.body.newName}`, (err) => {
    res.redirect('/')
  })
  // console.log(req.body)
})

app.get('/edit/:prevName', (req, res) => {
  res.render('edit', {prevName:req.params.prevName})
})


app.listen(3000, (req, res) => {
  console.log("server is running at 3000");
});
