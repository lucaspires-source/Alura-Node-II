class DadosNaoFornecidos extends Error {
    constructor(){
        super('Não foram fornecidos dados para atualizar')
        this.name = 'DadosNaoFornecidos'
        this.idErro = 3
    }
}

module.exports = DadosNaoFornecidos