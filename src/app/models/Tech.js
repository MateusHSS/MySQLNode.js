const { Model, DataTypes } = require('sequelize');

class Tech extends Model {
    //Metodo estatico que inicializa a tabela, deve ser passado a instancia de conexao com 
    //o banco, e dentro de super.init, um objeto que contenha os campos e os seus tipos,
    //alem disso, um objeto com 'sequelize' que recebe a conexao
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
        },{
            sequelize: connection,
            tableName: 'techs',
        })
    }

    static associate(models) {
        this.belongsToMany(models.User, { foreignKey: 'tech_id', through: 'user_techs', as: 'users'});
    }
}

module.exports = Tech;