const modelos = [
    require('../rotas/fornecedores/ModeloTabelaFornecedor'),
    require('../rotas/fornecedores/produtos/ModeloTabelaProduto')
]


async const criarTabelas = () => {
    for( let contator = 0; contator < modelos.length; contator++){
        const modelo = modelos[contator]
        await modelo.sync()
    }
}

criarTabelas ()