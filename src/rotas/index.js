import express from "express";
import livros from "./rotasLivros.js";
import autores from "./rotasAutores.js";

const rotas = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({titulo: "curso de Node"});
  });

  app.use(
    express.json(),
    livros,
    autores
  );
};

export default rotas;