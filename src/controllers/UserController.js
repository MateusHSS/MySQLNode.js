const User = require('../models/User');

module.exports = {

    //Metodo utilizado para salvar um usuario no banco
    //OBS: todas as interacoes com o banco de dados sao assincronas, portanto, sempre utilizar
    //async e await em todas os metodos e requisicoes
    async store(req, res) {
        const { name, email } = req.body;

        const user = await User.create(req.body);

        return res.json(user);
    },

    async index(req, res) {
        const users = await User.findAll();

        return res.json({ 
            users,
            user: req.userId
        });
    },

    async delete(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if(!user)
            return res.status(400).json({ error: 'User not found!' });

        await user.destroy();

        return res.json({ success: 'User deleted!'})
    }
}