const { Router } = require('express');
const { createPostController, listAllPostsController, 
  listOnePostController } = require('../controllers/post.controller');
const postMiddleware = require('../middlewares/post.middleware');
const jwtMiddleware = require('../middlewares/jwt.middleware');

const router = Router();

router.post('/', jwtMiddleware, postMiddleware, createPostController);
router.get('/', jwtMiddleware, listAllPostsController);
router.get('/:id', jwtMiddleware, listOnePostController);

module.exports = router;