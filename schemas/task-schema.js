import Joi from 'joi';

const taskAddSchema = Joi.object({
  title: Joi.string().max(250).required(),
  start: Joi.string()
    .regex(/^\d{2}:\d{2}$/)
    .required(),
  end: Joi.string()
    .regex(/^\d{2}:\d{2}$/)
    .required(),
  priority: Joi.string().valid('low', 'medium', 'high').required(),
  date: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  category: Joi.string().valid('to-do', 'in-progress', 'done').required(),
  // owner: Joi.string().required(),
});

const taskPutSchema = Joi.object({
  title: Joi.string(),
  start: Joi.string().regex(/^\d{2}:\d{2}$/),
  end: Joi.string().regex(/^\d{2}:\d{2}$/),
  priority: Joi.string().valid('low', 'medium', 'high'),
  date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: Joi.string().valid('to-do', 'in-progress', 'done'),
  // owner: Joi.string().required(),
});

const taskUpdateSchema = Joi.object({
  title: Joi.string(),
  start: Joi.string().regex(/^\d{2}:\d{2}$/),
  end: Joi.string().regex(/^\d{2}:\d{2}$/),
  priority: Joi.string().valid('low', 'medium', 'high'),
  date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: Joi.string().valid('to-do', 'in-progress', 'done'),
  // owner: Joi.string().required(),
});
export default {
  taskAddSchema,
  taskPutSchema,
  taskUpdateSchema,
};
