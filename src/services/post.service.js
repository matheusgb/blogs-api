const Sequelize = require('sequelize');
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

const listOnePostService = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories' },
    ],
  });
  return post;
};

const editPostService = async ({ title, content, idUser, idParam }) => {
  const post = await BlogPost.findOne({ where: { id: idParam, userId: idUser } });
  if (!post) return false;

  await post.update({
    title,
    content,
    updated: Date.now(),
  });

  const result = await BlogPost.findOne({
    where: { userId: idUser },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories' },
    ],
  });

  return result;
};

const deletePostService = async (idUser, idParam) => {
  const verifyId = await BlogPost.findOne({ where: { id: idParam } });
  if (!verifyId) return 'NOT_FOUND';

  const post = await BlogPost.findOne({ where: { id: idParam, userId: idUser } });
  if (!post) return 'UNAUTHORIZED';

  const result = await post.destroy(
    {
      where: { id: idParam },
    },
  );
  return result;
};

const searchPostService = async (q) => {
  const { Op } = Sequelize;

  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [ 
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories' },
    ],
  });
  return posts;
};

module.exports = { createPostService,
listAllPostsService,
listOnePostService,
editPostService,
deletePostService,
searchPostService };