## INSTALANDO O SEQUELIZE
    yarn add sequelize (Documentação: https://sequelize.org/master/)
    yarn add sequelize-cli

## INSTALANDO O MYSQL
    yarn add mysql2

## CRIANDO O BANCO
    yarn sequelize db:create

## CRIANDO AS MIGRATIONS
    yarn sequelize migration:create --name="nome-da-migration"

## CRIANDO AS TABELAS
    yarn sequelize db:migrate

## DESFAZENDO A ULTIMA MIGRAION (!!!APENAS NO AMBIENTE DE DESENVOLVIMENTO!!!)
    yarn sequelize db:migrate:undo

## MODULOS QUE FACILITAM A IMPORTACAO DE ARQUIVOS
    consign npm
    require-directory npm

## INSTALANDO O MODULO DE TOKEN DE AUTENTICACAO
    yarn add jsonwebtoken

## INSTALANDO MODULO DE ENCRIPTACAO DE SENHA
    yarn sequelize add bcryptjs

## INSTALANDO MODULO DE ENVIO DE EMAIL
    yarn add nodemailer

## INSTALANDO MODULO DE TEMPLATE DE EMAILS COM HTML
    yarn add nodemailer-express-handlebars

## INSTALANDO MODULO DE ARCHIVE DIRECTORY
    yarn add path

"src/routes.js" : Arquivo com todas as rotas do app;
"src/server.js" : Arquivo que inicializa o servidor na porta 8080;
    
    - "app.use(routes)" : Importa as rotas do arquivo routes para que sejam usadas no servidor;

    - "app.use(express.json())" : Faz o app conseguir entender requisições no formato JSON;

"src/config/database.js" : Retorna um módulo com as configurações de conexão com o banco de dados;

    - "dialect" : 'Tipo' de banco de dados (mysql, postgres, mongo...);

    -"define" : 

        - "undescored" : Define o formato dos nomes das tabelas como "Snake case", separados por '_';

