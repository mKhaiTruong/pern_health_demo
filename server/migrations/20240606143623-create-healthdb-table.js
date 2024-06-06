'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('healthdb', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      host_name: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      response_time: {
        type: Sequelize.FLOAT
      },
      cpu_usage: {
        type: Sequelize.FLOAT
      },
      memory_usage: {
        type: Sequelize.FLOAT
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('healthdb');
  }
};
