const Joi = require('joi');
const statusCode = require('../helpers/statusCode');

const validadeBody = (req, res, next) => {
  const { body } = req;

  const schema = Joi.object({
    title: Joi.string().required()
    .messages({ 'string.empty': 'Some required fields are missing' }),
    content: Joi.string().required()
    .messages({ 'string.empty': 'Some required fields are missing' }),
    categoryIds: Joi.array().required(),
  });

  const { error } = schema.validate(body);

  if (error) {
    return res.status(statusCode.BAD_REQUEST).json({ message: error.message });
  }

  next();
};

module.exports = validadeBody;