import Joi from "joi";

const taskSchema = Joi.object({
  title: Joi.string().max(250).required(),
  start: Joi.string().regex(/^\d{2}:\d{2}$/),
  end: Joi.string().regex(/^\d{2}:\d{2}$/),
  priority: Joi.string().valid("low", "medium", "high"),
  date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: Joi.string().valid("to-do", "in-progress", "done"),
  owner: Joi.string(),
});
export default taskSchema;
