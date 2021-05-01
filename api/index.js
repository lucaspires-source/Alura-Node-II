const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("config");
const roteador = require("./rotas/fornecedores");
const NaoEncontrado = require("./erros/NaoEncontrado");
const CampoInvalido = require("./erros/CampoInvalido");
const DadosNaoFornecidos = require("./erros/DadosNaoFornecidos");
const ValorNaoSuportado = require("./erros/ValorNaoSuportado");
const SerelizadorErro = require('./Serializador').SerelizadorErro
const formatosAceitos = require('./Serializador').formatosAceitos
app.use(bodyParser.json());
app.use((req,res,proximo) =>{
   let formatoRequisitado = req.header('Accept')
   if(formatoRequisitado === '*/*'){
     formatoRequisitado = 'application/json'
   }
  if(formatosAceitos.indexOf(formatoRequisitado) === -1){
      res.status(406)
      res.end()
      return
  }

  res.setHeader('Content-Type', formatoRequisitado)
  proximo()
})
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
  const serializador = new SerelizadorErro(
    res.getHeader('Content-Type')
  )
  res.send(
    serializador({
      mensagem: erro.message,
      id:erro.idErro
    })
  );
});
app.listen(config.get("api.porta"), () => console.log("App is running"));
