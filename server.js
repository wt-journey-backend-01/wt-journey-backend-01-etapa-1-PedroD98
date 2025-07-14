const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/sugestao", (req, res) => {
  const { nome, ingredientes } = req.query;
  res.status(200).send(`
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DevBurger</title>
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <div>
        <h1>Sugestão enviada com sucesso!</h1>
        <h3>Avaliaremos sua sugestão</h3>
      </div>
      <div>
        <p><strong>Nome do lanche: </strong> ${nome}</p>
      </div>
      <div>
        <p><strong>Ingredientes: </strong> ${ingredientes}</p>
      </div>
      <div class='footer'>
        <a href="/">Página inicial</a>
      </div>
    `);
});

app.get("/contato", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contato.html"));
});

app.post("/contato", (req, res) => {
  if (!req.body) {
    return res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
  }

  const { nome, email, assunto, mensagem } = req.body;

  res.status(200).send(`
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>DevBurger</title>
      <link rel="stylesheet" href="/css/style.css" />
    </head>
    <div>
      <h1>Agradecemos o contato, ${nome}!</h1>
    </div>
    <div>
      <p><strong>Seu email: </strong>${email}</p>
    </div>
    <div>
      <p><strong>Assunto: </strong>${assunto}</p>
    </div>
    <div>
      <p><strong>Sua mensagem: </strong>${mensagem}</p>
    </div>
    <div class='footer'>
      <a href="/">Página inicial</a>
    </div>
  `);
});

app.get("/api/lanches", (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "public", "data", "lanches.json"));
});

app.use("*splat", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});
