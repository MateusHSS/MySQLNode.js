'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', 
      'password_reset_token',
      {
        type: Sequelize.STRING,
        select: false,
        after: 'password'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'password_reset_token');
  }
};
