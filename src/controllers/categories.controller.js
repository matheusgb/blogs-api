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

module.exports = { categoryCreateController };