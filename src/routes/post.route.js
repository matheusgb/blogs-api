const { Router } = require('express');
const { createPostController } = require('../controllers/post.controller');
const postMiddleware = require('../middlewares/post.middleware');
const jwtMiddleware = require('../middlewares/jwt.middleware');

const router = Router();

router.post('/', jwtMiddleware, postMiddleware, createPostController);

module.exports = router;