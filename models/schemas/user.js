const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { runValidateAtUpdate, handleSaveError } = require("../hooks");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    skype: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
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

    token: String,
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", runValidateAtUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().min(6).required(),
});
const authSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  registerSchema,
  authSchema,
};
