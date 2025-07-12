const express = require("express");
const fs = require("fs");
const path = require("path");
const { execPath, send } = require("process");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

const lanchesObj = JSON.parse(
  fs.readFileSync(path.join(__dirname, "public", "data", "lanches.json"))
);

let contactObj;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/sugestao", (req, res) => {
  const { name, ingredients } = req.query;
  res.status(200).send(`
      <div>${name}</div>
      
      <div>${ingredients}</div>
      <button onclick="window.location.href='/'">Página incial</button>
    `);
});

app.get("/contato", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contato.html"));
});

app.post("/contato", (req, res) => {
  if (!req.body) {
    return res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  }
  const { name, email, subject, message } = req.body;

  res.status(200).send(`
    <div>
      <h1>Agradecemos o contato, ${name}!</h1>
    </div>
    <div>
      <p><strong>Seu email: </strong>${email}</p>
    </div>
    <div>
      <p><strong>Assunto: </strong>${subject}</p>
    </div>
    <div>
      <p><strong>Sua mensagem: </strong>${message}</p>
    </div>
    <button onclick="window.location.href='/'">Página incial</button>
  `);
});

app.get("/api/lanches", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "data", "lanches.json"));
});

app.all("*splat", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});
