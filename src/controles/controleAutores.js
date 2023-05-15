import autores from "../modelos/autores.js";
import NaoEncontrado from "../erros/naoEncontrado.js";

class controleAutores {

  static listaAutores = (req, res, next) => {
    try {
      const autoresResultado = autores.find();

      req.resultado = autoresResultado;

      next();
    }catch(erro) {
      next(erro);
    }

  };

  static encontraAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      let autor = await autores.findById(id);

      if(autor !== null){
        res.status(200).send(autor);
      }else{
        next(new NaoEncontrado("ID não encontrado"));
      }
    }catch(erro) {
      next(erro);
    }

  };
   
  static cadastraAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON());
    }catch(erro) {
      next(erro);
    }

  };

  static atualizaAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});

      if(autorResultado !== null){
        res.status(200).send("autor atualizado");
      }else{
        next(new NaoEncontrado("ID não encontrado"));
      }
    }catch(erro) {
      next(erro);
    }

  };

  static excluiAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findByIdAndDelete(id);

      if(autorResultado !== null){
        res.status(200).send("autor excluído");
      }else{
        next(new NaoEncontrado("ID não encontrado"));
      }
    }catch(erro) {
      next(erro);
    }

  };

}

export default controleAutores;
