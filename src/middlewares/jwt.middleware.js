const jwt = require('jsonwebtoken');
const statusCode = require('../helpers/statusCode');
require('dotenv').config();

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
  const { data } = jwt.verify(authorization, process.env.JWT_SECRET);
  req.user = data;
  next();
  } catch (_error) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;