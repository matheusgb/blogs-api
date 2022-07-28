const { BlogPost, PostCategory, Category } = require('../database/models');

const createPostService = async ({ title, content, categoryIds, userId }) => {
  const resultCategoryIds = await Category.findOne({ where: { id: categoryIds } });
  if (!resultCategoryIds) {
    return false;
  }
  
  const post = await BlogPost.create({
    title,
    content,
    userId,
    published: Date.now(),
    updated: Date.now(),
  });

  categoryIds.forEach(async (categoryId) => {
    await PostCategory.create({
      postId: post.id,
      categoryId,
    });
  });

  return post;
};

module.exports = { createPostService };
