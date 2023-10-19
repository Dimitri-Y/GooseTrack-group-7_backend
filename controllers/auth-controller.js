import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import { User } from "../models/schemas/user.js";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET, BASE_URL } = process.env;
import HttpError from "../helpers/httpError.js";
// import sendEmail from "../helpers/sendEmail.js";
import gravatar from "gravatar";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const avatarsPath = path.resolve("public", "avatar");

const signup = async (req, res) => {
  const { email, password, userName } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, 6);
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  const newUser = await User.create({
    userName,
    email,
    avatarURL,
    password: hashPassword,
    verificationCode,
    phone: "",
    skype: "",
    birthday: "",
  });
  // const verifyEmail = {
    
  //   to: email,
  //   subject: "Verify email",
  //   html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click to verify email</a>`,
  // };
  // await sendEmail(verifyEmail, email);

  res.status(201).json({
    status: "OK",
    code: 201,
    user: newUser,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  // if (!user.verify) {
  //   throw HttpError(404, "User not found");
  // }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

   const { _id: id } = user;
   const payload = {
     id,
   };
   const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
   await User.findByIdAndUpdate(id, { token });
   res.json({
     token,
     user: {
       email: user.email,
     },
   });
};

const getCurrent = async (req, res) => {
  const { email, phone, skype, birthday, userName } = req.user;

  res.json({
    email,
    phone,
    skype,
    birthday,
    userName,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

   res.status(204).json({
     code: 204,
     message: "No Content",
   });
};

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { email, skype, phone, userName, birthday } = req.body;
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatar", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  const { path: oldPath, filename } = req.file;
  await User.findByIdAndUpdate(_id, {
    email,
    skype,
    phone,
    userName,
    birthday,
  });
  res.json({
    avatarURL,
    email,
    skype,
    phone,
    userName,
    birthday,
  });
};
// const resendVerifyEmail = async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) throw HttpError(404, "Email not found");

//   if (user.verify) throw HttpError(400, "Email already verify");

//   if (user.email !== req.user.email)
//     throw HttpError(401, "Email not found in this user");

//   await sendEmail(user.verificationCode, email);

//   res.status(200).json({
//     status: "OK",
//     code: 200,
//     message: "Verify email resend success",
//     email,
//   });
// };

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUser: ctrlWrapper(updateUser),
  // resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
