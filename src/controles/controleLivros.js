import livros from "../modelos/livros.js";
import autores from "../modelos/autores.js";
import NaoEncontrado from "../erros/naoEncontrado.js";



class controleLivros {

  static listaLivros =  (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;

      next();
    }catch(erro) {
      next(erro);
    }

  };   
        
  static encontraPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      let livro = await livros.findById(id);

      if(livro !== null){
        res.status(200).send(livro);
      }else{
        next(new NaoEncontrado("ID não encontrado"));
      }
    }catch(erro) {
      next(erro);
    }

  };

  static encontraPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);
      
      if(busca !== null){
        let livro = livros.find(busca).populate("autor");

        req.resultado = livro;
  
        next();
      } else {
        res.status(200).send([]);
      }

    } catch(erro) {
      next(erro);
    }

  };

  static cadastraLivro = async (req, res, next) => {
    try {
      let livro = await new livros(req.body);
      livro.save();

      res.status(201).json(livro);
    }catch(erro) {
      next(erro);
    }

  };

  static atualizaLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      if(livroResultado !== null){
        res.status(200).send("livro atualizado");
      }else{
        next(new NaoEncontrado("ID não encontrado"));
      }
    }catch(erro) {
      next(erro);
    }

  };

  static excluiLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultado = await livros.findByIdAndDelete(id);

      if(livroResultado !== null){
        res.status(200).send("livro excluído");
      }else{
        next(new NaoEncontrado("ID não encontrado"));
      }
    }catch(erro) {
      next(erro);
    }

  };

}

async function processaBusca(parametro){
  const {editora, titulo, nomeAutor} = parametro;

  let busca = {};

  if(editora) busca.editora = editora;
  if(titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if(nomeAutor){
    const autor = await autores.findOne({ nome: { $regex: nomeAutor, $options: "i" }});

    if(autor !== null){
      busca.autor = autor._id;
    } else {
      busca = null;
    }
    
  }

  return busca;

}

export default controleLivros;
