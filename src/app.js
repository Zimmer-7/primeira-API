import express from "express";
import db from "./dbConnect.js";
import rotas from "./rotas/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

db.on("error", console.log.bind(console, "erro de conexão"));
db.once("open", () => {
  console.log("conexão com o banco realizada");
});

const app = express();

app.use(express.json());

rotas(app);

app.use(manipulador404);

app.use(manipuladorDeErros);

export default app;
