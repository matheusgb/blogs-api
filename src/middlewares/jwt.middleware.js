const jwt = require('jsonwebtoken');
const statusCode = require('../helpers/statusCode');
require('dotenv').config();

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const token = authorization.replace(/^Bearer\s/, '');
  const { data } = jwt.verify(token, process.env.JWT_SECRET);
  req.user = data;
  next();
  } catch (_error) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;