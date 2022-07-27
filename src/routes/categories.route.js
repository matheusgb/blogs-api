const { Router } = require('express');
const { categoryCreateController } = require('../controllers/categories.controller');
const categoriesMiddleware = require('../middlewares/categories.middleware');
const jwtMiddleware = require('../middlewares/jwt.middleware');

const router = Router();

router.post('/', jwtMiddleware, categoriesMiddleware, categoryCreateController);

module.exports = router;