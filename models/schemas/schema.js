import Joi from "joi";

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
const logSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export default {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
};
