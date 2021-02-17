const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    //Metodo estatico que inicializa a tabela, deve ser passado a instancia de conexao com 
    //o banco, e dentro de super.init, um objeto que contenha os campos e os seus tipos,
    //alem disso, um objeto com 'sequelize' que recebe a conexao
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },{
            sequelize: connection,
            hooks: {
                beforeSave: async (user, options) => {
                    const hash = await bcrypt.hash(user.password, 10);
                    user.password = hash;
                }
            }
        })
    }

    static associate(models){
        this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
        this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs'});
    }
}

module.exports = User;