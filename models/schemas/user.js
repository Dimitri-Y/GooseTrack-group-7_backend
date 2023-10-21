import { Schema, model } from "mongoose";
import Joi from "joi";
import { handlleSaveError, runValidateAtUpdate } from "../hooks.js";

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegexp = /^\+380\d{9}$/;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      // required: true,
    },
    skype: {
      type: String,
      // required: true,
    },
    birthday: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      required: [true, "Set password for userSchema"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    avatarURL: {
      type: String,
    },

    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handlleSaveError);
userSchema.pre("findOneAndUpdate", runValidateAtUpdate);
userSchema.post("findOneAndUpdate", handlleSaveError);

export const registerSchema = Joi.object({
  userName: Joi.string().min(3).required(),
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().min(6).required(),
});
export const authSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const updateSchema = Joi.object({
  userName: Joi.string().min(3).required(),
  phone: Joi.string().pattern(phoneRegexp),
  skype: Joi.string(),
  birthday: Joi.string().pattern(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/),
  email: Joi.string().pattern(emailRegexp),
avatarURL: Joi.string()
})

export const User = model("user", userSchema);
