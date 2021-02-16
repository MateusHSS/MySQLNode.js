const express = require('express');
const routes = require('./routes');

require('./database');

const app = express();

app.use(express.json());
//Usa todas as rotas que forem criadas no arquivo routes.js
app.use(routes);

app.listen(8080, ()=>{
    console.log('Server rodando na porta 8080');
});