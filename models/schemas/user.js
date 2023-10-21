import { Schema, model } from "mongoose";
import Joi from "joi";
import { handlleSaveError, runValidateAtUpdate } from "../hooks.js";

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

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
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
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
export const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  
});

export const User = model("user", userSchema);
