'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'addressId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Users', 'addressId');
  },
};
