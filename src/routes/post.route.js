const { Router } = require('express');
const { createPostController, listAllPostsController } = require('../controllers/post.controller');
const postMiddleware = require('../middlewares/post.middleware');
const jwtMiddleware = require('../middlewares/jwt.middleware');

const router = Router();

router.post('/', jwtMiddleware, postMiddleware, createPostController);
router.get('/', jwtMiddleware, listAllPostsController);

module.exports = router;