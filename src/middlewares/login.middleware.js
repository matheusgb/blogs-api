const Joi = require('joi');
const statusCode = require('../helpers/statusCode');

const validadeBody = (req, res, next) => {
  const { body } = req;

  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(body);

  if (error) {
    return res.status(statusCode.BAD_REQUEST).json({ message: 'Some required fields are missing' });
  }

  next();
};

module.exports = validadeBody;