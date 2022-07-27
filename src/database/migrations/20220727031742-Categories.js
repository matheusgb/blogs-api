'use strict';
module.exports = {
    /**
   * @param {import('sequelize').queryInterface } queryInterface 
   * @param {import('sequelize').Sequelize} Sequelize 
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Categories');
  }
};
