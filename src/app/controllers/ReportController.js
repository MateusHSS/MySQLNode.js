const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
    async show(req, res) {
        //Encontrar todos usuarios que tem email que termina @hotmail.com
        //Desses usuarios, encontrar todos que moram na rua "Monte Libano"
        //Desses usuarios, buscar as tenconologias que comecam com React

        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: { 
                email: {
                    [Op.like]: '%@hotmail.com'
                }
            },
            include: [
                { 
                    association: 'addresses', 
                    where: { 
                        street: 'Rua Monte Libano' 
                    } 
                },
                { 
                    association: 'techs', 
                    required: false,
                    where: { 
                        name: {
                            [Op.like]: 'React%',
                        },
                    }
                }
            ]
        });

        return res.json(users);
    }
}