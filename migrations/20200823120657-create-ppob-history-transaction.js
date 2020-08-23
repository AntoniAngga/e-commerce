'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PPOB_history_transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      invoice: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['waiting', 'success', 'cancel'],
      },
      category: {
        type: Sequelize.STRING,
      },
      number: {
        type: Sequelize.STRING,
      },
      payment_method: {
        type: Sequelize.STRING,
      },
      detail_transaction: {
        type: Sequelize.JSON,
      },
      total_price: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PPOB_history_transactions');
  },
};
