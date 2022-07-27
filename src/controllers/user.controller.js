const userService = require('../services/user.service');
const statusCode = require('../helpers/statusCode');

const userController = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  try {
    const token = await userService.createUser({ displayName, email, password, image });

    if (token === 'ALREADY_EXISTS') {
      return res.status(statusCode.ALREADY_EXISTS).json({ message: 'User already registered' });
    }

    res.status(statusCode.CREATED).json({ token });
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
};

module.exports = { userController };