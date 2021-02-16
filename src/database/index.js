const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

//importa o model do usuario que foi criado
const User = require('../models/User');
const Address = require('../models/Address');
const Tech = require('../models/Tech');

const connection = new Sequelize(dbConfig);

//Inicializa a tabela, chamando a funcao init, passando a conexao do banco como parametro
User.init(connection);
Address.init(connection);
Tech.init(connection);

User.associate(connection.models);
Address.associate(connection.models);
Tech.associate(connection.models);

module.exports = connection;