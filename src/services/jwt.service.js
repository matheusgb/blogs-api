require('dotenv').config();
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const token = jwt.sign(
    { data: user }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h', algorithm: 'HS256' },
    );
  return token;
};

module.exports = { createToken };