const Modelo = require("./ModeloTabelaProduto");

module.exports = {
  listar(idFornecedor) {
    return Modelo.findAll({
      where: {
        fornecedor: idFornecedor,
      },
      raw: true,
    });
  },
  inserir(dados) {
    return Modelo.create(dados);
  },

  remover(idProduto, idFornecedor) {
    return Modelo.destroy({
      where: {
        id: idProduto,
        fornecedor: idFornecedor,
      },
    });
  },

  async pegarPorId(idProduto, idFornecedor) {
    const find = await Modelo.findOne({
      where: {
        id: idProduto,
        fornecedor: idFornecedor,
      },
    });
    if (!encontrado) {
      throw new Error("Produto não foi encontrado!");
    }
  },
  atualizar(dadosDoProduto, dadosParaAtualizar) {
    return Modelo.update(dadosParaAtualizar, {
      where: dadosDoProduto,
    });
  },
  subtrair (idProduto, idFornecedor, campo, quantidade) {
    return instancia.transaction(async transacao => {
        const produto = await Modelo.findOne({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            }
        })

        produto[campo] = quantidade

        await produto.save()

        return produto
    })
}
};
