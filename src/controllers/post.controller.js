const { createPostService, listAllPostsService, 
  listOnePostService,
  editPostService, deletePostService, searchPostService } = require('../services/post.service');
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

const listOnePostController = async (req, res) => {
  const post = await listOnePostService(req.params.id);
  if (!post) return res.status(statusCode.NOT_FOUND).json({ message: 'Post does not exist' });
  return res.status(statusCode.OK).json(post);
};

const editPostController = async (req, res) => {
  const post = await editPostService({ ...req.body, idUser: req.user.id, idParam: req.params.id });
  if (!post) return res.status(statusCode.UNAUTHORIZED).json({ message: 'Unauthorized user' });
  return res.status(statusCode.OK).json(post);
};

const deletePostController = async (req, res) => {
  const result = await deletePostService(req.user.id, req.params.id);
  if (result === 'NOT_FOUND') {
    return res.status(statusCode.NOT_FOUND).json({ message: 'Post does not exist' });
  }
  if (result === 'UNAUTHORIZED') {
  return res.status(statusCode.UNAUTHORIZED).json({ message: 'Unauthorized user' });
  }
  return res.status(statusCode.NO_CONTENT).json({ message: result });
};

const searchPostController = async (req, res) => {
  const { q } = req.query;
  const posts = await searchPostService(q);
  return res.status(statusCode.OK).json(posts);
};

module.exports = { createPostController,
listAllPostsController, 
listOnePostController,
editPostController,
deletePostController,
searchPostController };