const { createUserService, getAllUsersService, 
  getOneUserService, deleteUserService } = require('../services/user.service');
const statusCode = require('../helpers/statusCode');

const userCreateController = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  try {
    const token = await createUserService({ displayName, email, password, image });

    if (token === 'ALREADY_EXISTS') {
      return res.status(statusCode.ALREADY_EXISTS).json({ message: 'User already registered' });
    }

    res.status(statusCode.CREATED).json({ token });
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
};

const userGetAllController = async (_req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(statusCode.OK).json(users);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
};

const getOneUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getOneUserService(id);
    
    if (!user) {
      return res.status(statusCode.NOT_FOUND).json({ message: 'User does not exist' });
    }

    res.status(statusCode.OK).json(user);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
};

const deleteUserController = async (req, res) => {
  const { id } = req.user;
  await deleteUserService(id);
  return res.status(statusCode.NO_CONTENT).send();
};

module.exports = { userCreateController,
userGetAllController,
getOneUserController,
deleteUserController };