const User = require('../models/User');

module.exports = {

    //Metodo utilizado para salvar um usuario no banco
    //OBS: todas as interacoes com o banco de dados sao assincronas, portanto, sempre utilizar
    //async e await em todas os metodos e requisicoes
    async store(req, res) {
        const { name, email } = req.body;

        const user = await User.create({name, email});

        return res.json(user);
    },

    async index(req, res) {
        const users = await User.findAll();

        return res.json(users);
    },
}