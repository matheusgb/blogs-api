'use strict';
//JSdocs
  /**
   * @param {import('sequelize').Sequelize } sequelize 
   * @param {import('sequelize').DataTypes} DataTypes 
   */
const createPostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
        type: DataTypes.INTEGER, 
        foreignKey: true 
    },
    categoryId: { 
        type: DataTypes.INTEGER, 
        foreignKey: true 
    },
},
{
  timestamps: false,
  tableName: 'PostCategories',
});

PostCategory.associate = (models) => {
  models.BlogPost.belongsToMany(models.Category, {
    as: 'categories',
    through: PostCategory,
    foreignKey: 'categoryId',
    otherKey: 'postId',
  });
  
  models.Category.belongsToMany(models.BlogPost, {
    as: 'posts',
    through: PostCategory,
    foreignKey: 'postId',
    otherKey: 'categoryId',
  });
};
return PostCategory;
};

module.exports = createPostCategoryModel