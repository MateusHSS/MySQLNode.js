const { Model, DataTypes } = require('sequelize');

class Address extends Model {
    //Metodo estatico que inicializa a tabela, deve ser passado a instancia de conexao com 
    //o banco, e dentro de super.init, um objeto que contenha os campos e os seus tipos,
    //alem disso, um objeto com 'sequelize' que recebe a conexao
    static init(connection) {
        super.init({
            zipcode: DataTypes.STRING,
            street: DataTypes.STRING,
            number: DataTypes.INTEGER,
        },{
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});
    }
}

module.exports = Address;