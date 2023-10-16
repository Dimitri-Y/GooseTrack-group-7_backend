import Joi from "joi";

export const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
export const logSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});
export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export default {
  addSchema,
  logSchema,
  updateSchema,
  updateFavoriteSchema,
};
