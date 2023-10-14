import { Schema, model } from 'mongoose';
import { handlleSaveError, runValidateAtupdate } from './hooks.js';

export const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    nameUser: {
      type: String,
      required: true,
    },
    skype: {
      type: String,
      required: [true, "Set password for user"],
    },
    birthday: {
      type: String,
      required: [true, "Set password for user"],
    },
    phone: {
      type: String,
      required: true,
    },

    avatarURL: {
      type: String,
    },
    token: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('findOneAndUpdate', runValidateAtupdate);
userSchema.post('findOneAndUpdate', handlleSaveError);
userSchema.post('save', handlleSaveError);

const User = model('user', userSchema);
export default User;
