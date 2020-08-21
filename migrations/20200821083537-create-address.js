'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Addresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      longAddress: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      city: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      city_text: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      province: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      province_text: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Addresses');
  }
};