const { createPostService, listAllPostsService } = require('../services/post.service');
const statusCode = require('../helpers/statusCode');

const createPostController = async (req, res) => {
  const postBody = { ...req.body, userId: req.user.id };

  const post = await createPostService(postBody);
  if (!post) return res.status(statusCode.BAD_REQUEST).json({ message: '"categoryIds" not found' });
  return res.status(statusCode.CREATED).json(post);
};

const listAllPostsController = async (_req, res) => {
  const posts = await listAllPostsService();
  return res.status(statusCode.OK).json(posts);
};

module.exports = { createPostController, listAllPostsController };