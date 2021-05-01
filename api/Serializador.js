const ValorNaoSuportado = require("./erros/ValorNaoSuportado")

class Serializador{
    json(dados){
        return JSON.stringify(dados)
    }
    serializar(dados){
        if (this.contentType === 'application/json'){
            return this.json(dados)
        }
        else{
            throw new ValorNaoSuportado(this.contentType)
        }
    }
}

class SerelizadorFornecedor extends Serializador{
    constructor(contentType){
        super()
        this.contentType = contentType
    }
}
module.exports = {
    Serializador:Serializador,
    formatosAceitos:['application/json'],
    SerelizadorFornecedor:SerelizadorFornecedor

}