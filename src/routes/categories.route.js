const { Router } = require('express');
const { categoryCreateController, 
  findAllCategoriesController } = require('../controllers/categories.controller');
const categoriesMiddleware = require('../middlewares/categories.middleware');
const jwtMiddleware = require('../middlewares/jwt.middleware');

const router = Router();

router.post('/', jwtMiddleware, categoriesMiddleware, categoryCreateController);
router.get('/', jwtMiddleware, findAllCategoriesController);

module.exports = router;