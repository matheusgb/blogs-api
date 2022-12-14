const { Router } = require('express');
const { createPostController, listAllPostsController, 
  listOnePostController, editPostController, 
  deletePostController, searchPostController } = require('../controllers/post.controller');
const postMiddleware = require('../middlewares/post.middleware');
const jwtMiddleware = require('../middlewares/jwt.middleware');
const putPostMiddleware = require('../middlewares/putPost.middleware');

const router = Router();

router.post('/', jwtMiddleware, postMiddleware, createPostController);
router.get('/', jwtMiddleware, listAllPostsController);
router.get('/search', jwtMiddleware, searchPostController);
router.get('/:id', jwtMiddleware, listOnePostController);
router.put('/:id', jwtMiddleware, putPostMiddleware, editPostController);
router.delete('/:id', jwtMiddleware, deletePostController);

module.exports = router;