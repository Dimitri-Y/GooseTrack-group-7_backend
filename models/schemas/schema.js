import Joi from "joi";

const emailRegexp = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9_-]+).([a-zA-Z]{2,5})$/;
const passwordRegexp = /^(?=.*\d)[A-Za-z\d]{6,}$/;
const phoneRegexp = /^\d{2}\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}$/;
const birthdayRegexp = /^\d{2}\/\d{2}\/\d{4}$/;

export const addSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().min(6).required(),
});
export const logSchema = Joi.object({
  // name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().min(6).required().pattern(passwordRegexp),
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
