const { User } = require('../database/models');
const { createToken } = require('./jwt.service');

const loginService = {
  createCredentials: async ({ email, password }) => {
    const user = await User.findOne({ where: { email, password } });

    if (!user) {
      return 'BAD_REQUEST';
    }

    const token = createToken(user);

    return token;
  },
 };

module.exports = loginService;