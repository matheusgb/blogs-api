const { Router } = require('express');
const { userController } = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

const router = Router();

router.post('/', userMiddleware, userController);

module.exports = router;