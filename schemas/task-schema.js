import Joi from 'joi';

const taskAddSchema = Joi.object({
  body: Joi.string().required().messages({
    'any.required': `"title" must be exist`,
  }),
  progress: Joi.string().required().messages({
    'any.required': `"email" must be exist`,
  }),
  importance: Joi.string().required().messages({
    'any.required': `"phone" must be exist`,
  }),
  owner: Joi.boolean(),
});

const taskPutSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const taskUpdateSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': `missing field favorite`,
  }),
});
export default {
  taskAddSchema,
  taskPutSchema,
  taskUpdateSchema,
};
