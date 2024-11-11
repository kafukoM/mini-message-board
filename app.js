const express = require("express");
const path = require("node:path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//Express middleware to parse form body
app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.get("/", (req, res) => {
  res.render("index", { messages: messages });
});

app.get("/new", (req, res) => {
  res.render("form");
});

app.post("/new", (req, res) => {
  messageText = req.body.message;
  messageUser = req.body.author;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect("/");
});

app.get("/detail/:index", (req, res) => {
  const messageIndex = parseInt(req.params.index, 10);
  const message = messages[messageIndex];

  if (message) {
    res.render("detail", { message: message });
  } else {
    res.status(404).send("Message not found");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Mini Message Board App - listening on port ${PORT}!`);
});
