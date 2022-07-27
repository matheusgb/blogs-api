'use strict';
module.exports = {
    /**
   * @param {import('sequelize').queryInterface } queryInterface 
   * @param {import('sequelize').Sequelize} Sequelize 
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PostCategories', {
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BlogPosts',
          key: 'id',
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        }
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('PostCategories');
  }
};