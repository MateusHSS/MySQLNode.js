'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', 
      'password_reset_expires',
      {
        type: Sequelize.DATE,
        select: false,
        after: 'password_reset_token'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'password_reset_expires');
  }
};
