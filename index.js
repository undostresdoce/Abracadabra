// Importación e instancia de Express
const express = require("express");
const app = express();

// Puerto del servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`El Servidor está inicializado en el puerto ${PORT}`);
});

// Middleware
app.use(express.static("assets"));

// Arreglo de usuarios
const usuarios = [
  "Juan",
  "Jocelyn",
  "Astrid",
  "Maria",
  "Ignacia",
  "Javier",
  "Brian",
];

// Devolución de arreglo de usuarios en formato JSON
app.get("/abracadabra/usuarios", (req, res) => {
  res.json({ usuarios });
});

// Middleware para validar usuario en la ruta
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  if (usuarios.includes(req.params.usuario)) {
    next();
  } else {
    res.redirect("/who.jpeg");
  }
});

// Ruta para el juego
app.get("/abracadabra/juego/:usuario", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Generar número aleatorio
const generarNumeroAleatorio = () => Math.floor(Math.random() * 4) + 1;
let numeroAleatorio = generarNumeroAleatorio();

// Ruta para el juego del conejo
app.get("/abracadabra/conejo/:n", (req, res) => {
  const parametroN = Number(req.params.n);

  if (parametroN === numeroAleatorio) {
    res.redirect("/conejito.jpg");
    numeroAleatorio = generarNumeroAleatorio(); // Regenerar número aleatorio para la próxima vez
  } else {
    res.redirect("/voldemort.jpg");
  }
});

// Ruta para manejo de páginas no encontradas
app.get("*", (req, res) => {
  res.send(`
    <h1>Esta página no existe...</h1>
  `);
});
