import ErroBase from "./erroBase.js";

class RequisicaoIncorreta extends ErroBase{
  constructor(mensagem = "um ou mais dados inválidos"){
    super(mensagem, 400);
  }
}

export default RequisicaoIncorreta;