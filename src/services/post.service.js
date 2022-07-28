const { BlogPost, PostCategory, Category, User } = require('../database/models');

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

const listAllPostsService = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories' },
    ],
  });
  return posts;
};

module.exports = { createPostService, listAllPostsService };