const { User } = require('../database/models');
const { createToken } = require('./jwt.service');

const createUser = async ({ displayName, email, password, image }) => {
  const findOne = await User.findOne({ where: { email } });
  if (findOne) {
    return 'ALREADY_EXISTS';
  }

  const user = await User.create({ displayName, email, password, image });
  const token = createToken(user);

  return token;
};

const getAllUsers = async () => {
  const users = await User.findAll(
    {
      attributes: { exclude: ['password'] },
    },
  );
  return users;
};

const getOneUser = async (id) => {
  const user = await User.findOne({ 
    where: { id },
    attributes: { exclude: ['password'] },
  });
  return user;
};

module.exports = { createUser, getAllUsers, getOneUser };