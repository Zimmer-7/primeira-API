import ErroBase from "./erroBase.js";

class NaoEncontrado extends ErroBase{
  constructor(mensagem = "página não encontrada"){
    super(mensagem, 404);
  }
}

export default NaoEncontrado;
