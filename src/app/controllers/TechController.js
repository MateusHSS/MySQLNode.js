const User = require('../models/User');
const Tech = require('../models/Tech');

module.exports = {
    async store(req, res){
        const { user_id } = req.params;

        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if(!user){
            return res.status(400).json({ error: 'User not found' });
        }
        
        //Find or create retorna um array, sendo as posicoes, o model da tecnologia e um booleano que fala se foi criado agora ou nao
        const [ tech ] = await Tech.findOrCreate({ 
            where: { name } 
        });

        //Utiliza um dos metodos auxiliares que sao criados em um relacionamento N-N
        await user.addTech(tech);

        return res.json(tech);
    },

    async index(req, res){
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, { 
            include: { 
                association: 'techs', 
                //Atributos da tabela pivot que eu desejo trazer na query
                through: { 
                    attributes: [] 
                }}
        });

        return res.json(user.techs)
    },

    async delete(req, res){
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if(!user){
            return res.status(400).json({ error: 'User not found' });
        }

        const tech = await Tech.findOne({
            where: { name }
        });

        //Metodo auxiliar criado pelo relacionamento N-N
        await user.removeTech(tech);

        return res.json({ error: false, message: "Tech removed success!"});
    }
}