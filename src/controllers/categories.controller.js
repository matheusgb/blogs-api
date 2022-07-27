const categoryService = require('../services/categories.service');
const statusCode = require('../helpers/statusCode');

const categoryCreateController = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await categoryService.createCategory({ name });
    res.status(statusCode.CREATED).json(category);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
};

const findAllCategoriesController = async (_req, res) => {
  try {
    const categories = await categoryService.findAllCategories();
    res.status(statusCode.OK).json(categories);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
};

module.exports = { categoryCreateController, findAllCategoriesController };