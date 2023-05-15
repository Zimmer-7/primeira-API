import express from "express";
import controleLivros from "../controles/controleLivros.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/livros", controleLivros.listaLivros, paginar)
  .get("/livros/busca", controleLivros.encontraPorFiltro, paginar)
  .get("/livros/:id", controleLivros.encontraPorId)
  .post("/livros", controleLivros.cadastraLivro)
  .put("/livros/:id", controleLivros.atualizaLivro)
  .delete("/livros/:id", controleLivros.excluiLivro);

export default router;