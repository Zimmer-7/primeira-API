import express from "express";
import controleAutores from "../controles/controleAutores.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/Autores", controleAutores.listaAutores, paginar)
  .get("/Autores/:id", controleAutores.encontraAutor)
  .post("/Autores", controleAutores.cadastraAutor)
  .put("/Autores/:id", controleAutores.atualizaAutor)
  .delete("/Autores/:id", controleAutores.excluiAutor);

export default router;