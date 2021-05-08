const roteador = require("express").Router({ mergeParams: true });
const Tabela = require("./TabelaProduto");
const Produto = require("./Produto")
roteador.get("/", async (req, res) => {
  const produtos = await Tabela.listar(req.params.idFornecedor);
  res.send(JSON.stringify([]));
});


roteador.post('/', async (req,res) =>{
    const idFornecedor = req.params.idFornecedor
    const body = req.body
    const dados = Object.assign({},body,{fornecedor: idFornecedor})
    const produto = new Produto(dados)
    await produto.criar()
})
module.exports = roteador;
