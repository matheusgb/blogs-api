const { User } = require('../database/models');
const { createToken } = require('./jwt.service');

const createUserService = async ({ displayName, email, password, image }) => {
  const findOne = await User.findOne({ where: { email } });
  if (findOne) {
    return 'ALREADY_EXISTS';
  }

  const user = await User.create({ displayName, email, password, image });
  const token = createToken(user);

  return token;
};

const getAllUsersService = async () => {
  const users = await User.findAll(
    {
      attributes: { exclude: ['password'] },
    },
  );
  return users;
};

const getOneUserService = async (id) => {
  const user = await User.findOne({ 
    where: { id },
    attributes: { exclude: ['password'] },
  });
  return user;
};

const deleteUserService = async (id) => {
  const user = await User.destroy({ where: { id } });
  return user;
};
module.exports = { createUserService, getAllUsersService, getOneUserService, deleteUserService };