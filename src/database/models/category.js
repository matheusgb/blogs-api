'use strict';
//JSdocs
  /**
   * @param {import('sequelize').Sequelize } sequelize 
   * @param {import('sequelize').DataTypes} DataTypes 
   */
const createCategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Categories',
    timestamps: false,
  })
  return Category;
};

module.exports = createCategoryModel