const ValorNaoSuportado = require("./erros/ValorNaoSuportado");
const jsontoxml = require("jsontoxml");
class Serializador {
  json(dados) {
    return JSON.stringify(dados);
  }
  xml(dados) {
    let tag = this.tagSingular
    if(Array.isArray(dados)){
        tag = this.tagPlural
        dados =dados.map((item)=>{
            return{
                [this.tagSingular]:item
            }
        })
    }
    return jsontoxml({ [tag]: dados });
  }
  serializar(dados) {
    dados = this.filtrar(dados);
    if (this.contentType === "application/json") {
      return this.json(dados);
    }

    if (this.contentType === "application/xml") {
      return this.xml(dados);
    } else {
      throw new ValorNaoSuportado(this.contentType);
    }
  }
  filtrarObjeto(dados) {
    const novoObjeto = {};

    this.camposPublicos.forEach((campo) => {
      if (dados.hasOwnProperty(campo)) {
        novoObjeto[campo];
      }
    });
    return novoObjeto;
  }
  filtrar(dados) {
    if (Array.isArray(dados)) {
      dados = dados.map(this.filtrarObjeto);
    } else {
      dados = this.filtrarObjeto(dados);
    }
    return dados;
  }
}

class SerelizadorFornecedor extends Serializador {
  constructor(contentType, camposExtras) {
    super();
    this.contentType = contentType;
    this.camposPublicos = ["id", "empresa", "categoria"].concat(
      camposExtras || []
    );

    this.tagSingular =  "fornecedor";
    this.tagPlural="fornecedores"
  }
}

class SerelizadorErro extends Serializador {
  constructor(contentType, camposExtras) {
    super();
    this.contentType = contentType;
    this.camposPublicos = ["id", "mensagem"].concat(camposExtras || []);
    this.tagSingular = "erro";
    this.tagPlural ="erros"
  }
}
module.exports = {
  Serializador: Serializador,
  formatosAceitos: ["application/json", "application/xml"],
  SerelizadorFornecedor: SerelizadorFornecedor,
  SerelizadorErro: SerelizadorErro,
};
