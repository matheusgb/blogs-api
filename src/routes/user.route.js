const { Router } = require('express');
const { userCreateController, 
  userGetAllController, getOneUserController } = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');
const jwtMiddleware = require('../middlewares/jwt.middleware');

const router = Router();

router.post('/', userMiddleware, userCreateController);
router.get('/', jwtMiddleware, userGetAllController);
router.get('/:id', jwtMiddleware, getOneUserController);

module.exports = router;