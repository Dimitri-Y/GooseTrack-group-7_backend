import { Schema, model } from "mongoose";
import Joi from "joi";
import { handlleSaveError, runValidateAtUpdate } from "../hooks.js";

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegexp = /^\d{2}\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}$/;
const birthdayRegexp = /^\d{2}\/\d{2}\/\d{4}$/;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Need set username"],
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Need set a password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Need set an Email "],
    },
    phone: {
      type: String,
      match: [phoneRegexp, "Invalid phone number format."],
      default: "",
    },

    birthday: {
      type: String,
      match: birthdayRegexp,
      default: "",
    },
    skype: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationCode: {
    //   type: String,
    //   required: [true, "Verify token is required"],
    // },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handlleSaveError);
userSchema.pre("findOneAndUpdate", runValidateAtUpdate);
userSchema.post("findOneAndUpdate", handlleSaveError);

export const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().min(6).required(),
});
export const authSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const User = model("user", userSchema);
