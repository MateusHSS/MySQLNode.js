'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', 
      'password',
      {
        type: Sequelize.STRING,
        allowNull: false,
        select: false,
        after: 'email'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'password');
  }
};
