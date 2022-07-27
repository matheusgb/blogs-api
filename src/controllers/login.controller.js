const loginService = require('../services/login.service');
const statusCode = require('../helpers/statusCode');

const loginController = async (req, res) => {
  // const { email, password } = loginService.validadeBody(req.body);
  const { email, password } = req.body;

  try {
    const token = await loginService.createCredentials({ email, password });

    if (token === 'BAD_REQUEST') {
      return res.status(statusCode.BAD_REQUEST).json({ message: 'Invalid fields' });
    }

    res.status(statusCode.OK).json({ token });
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
};

module.exports = { loginController };