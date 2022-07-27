const Joi = require('joi');
const statusCode = require('../helpers/statusCode');

const validadeBody = (req, res, next) => {
  const { body } = req;

  const schema = Joi.object().keys({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
  });

  const { error } = schema.validate(body);

  if (error) {
    return res.status(statusCode.BAD_REQUEST).json({ message: error.message });
  }

  next();
};

module.exports = validadeBody;