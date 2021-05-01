const ValorNaoSuportado = require("./erros/ValorNaoSuportado")

class Serializador{
    json(dados){
        return JSON.stringify(dados)
    }
    serializar(dados){
        if (this.contentType === 'application/json'){
            return this.json(this.filtrar(dados))
        }
        else{
            throw new ValorNaoSuportado(this.contentType)
        }
    }
    filtrarObjeto(dados){
        const novoObjeto = {}

        this.camposPublicos.forEach((campo) =>{
            if (dados.hasOwnProperty(campo)){
                novoObjeto[campo]
            }
        })
        return novoObjeto
    }
    filtrar(dados){
        if(Array.isArray(dados)){
            dados=dados.map(this.filtrarObjeto)
        }else{
            dados = this.filtrarObjeto(dados)
        }
        return dados
    }
}

class SerelizadorFornecedor extends Serializador{
    constructor(contentType, camposExtras){
        super()
        this.contentType = contentType
        this.camposPublicos = ['id','empresa','categoria'].concat(camposExtras|| [])

    }
}

class SerelizadorErro extends Serializador{
    constructor(contentType,camposExtras){
        super()
        this.contentType = contentType
        this.camposPublicos = ['id','mensagem'].concat(camposExtras|| [])
    }

}
module.exports = {
    Serializador:Serializador,
    formatosAceitos:['application/json'],
    SerelizadorFornecedor:SerelizadorFornecedor,
    SerelizadorErro:SerelizadorErro

}