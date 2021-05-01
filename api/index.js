const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("config");
const roteador = require("./rotas/fornecedores");
const NaoEncontrado = require("./erros/NaoEncontrado");
const CampoInvalido = require("./erros/CampoInvalido");
const DadosNaoFornecidos = require("./erros/DadosNaoFornecidos");
const ValorNaoSuportado = require("./erros/ValorNaoSuportado");

app.use(bodyParser.json());

app.use("/api/fornecedores", roteador);

app.use((erro, req, res,proximo) => {
  if (erro instanceof NaoEncontrado) {
    res.status(404);
  }
  if (erro instanceof CampoInvalido || DadosNaoFornecidos ){
      res.status(400)
  }
  if(erro instanceof ValorNaoSuportado){
    res.status(406)
  }
  res.send(
    JSON.stringify({
      mensagem: erro.message,
    })
  );
});
app.listen(config.get("api.porta"), () => console.log("App is running"));
