import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import Jimp from "jimp";
import path from "path";
import { User } from "../models/schemas/user.js";
import { nanoid } from "nanoid";
import HttpError from "../helpers/httpError.js";
import userField from "../helpers/userField.js";
// import sendEmail from "../helpers/sendEmail.js";
import gravatar from "gravatar";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
const avatarsDir = path.join("public", "avatar");

import dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET, BASE_URL, BASE_URL_BACK } = process.env;

const signup = async (req, res) => {
  const { email, password, userName } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();
  const newUser = await User.create({
    userName,
    email,
    avatarURL,
    password: hashPassword,
    // verificationCode,
    phone: "",
    skype: "",
    birthday: "",
  });
  // const verifyEmail = {
  //   to: email,
  //   subject: "Verify email",
  //   html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click to verify email</a>`,
  // };
  // await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
    // verificationCode: newUser.verificationCode,
    phone: " ",
    skype: " ",
    birthday: " ",
    userName: newUser.userName,
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
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
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

  res.status(204);
};

// const updateUser = async (req, res) => {
//   const { _id } = req.user;
//   const { email, skype, phone, userName, birthday } = req.body;
//   const newPath = path.join(avatarsPath, filename);
//   await fs.rename(oldPath, newPath);
//   const avatarURL = path.join("avatar", filename);
//   await User.findByIdAndUpdate(_id, { avatarURL });
//   const { path: oldPath, filename } = req.file;
//   await User.findByIdAndUpdate(_id, {
//     email,
//     skype,
//     phone,
//     userName,
//     birthday,
//   });
//   res.json({
//     avatarURL,
//     email,
//     skype,
//     phone,
//     userName,
//     birthday,
//   });
// };

const updateUser = async (req, res) => {
  
  if (!req.user)
    throw HttpError(401, "Missing header with authorization token");

  const { _id } = req.user;

  const { path: oldPath, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(oldPath, resultUpload);

  const resizeFile = await Jimp.read(resultUpload);
  await resizeFile.resize(250, 250).write(resultUpload);

  const avatarURL = path.join("avatar", filename);

  const body = req.body;

  body.avatarURL = `${BASE_URL_BACK}/${avatarURL.replace("\\", "/")}`;

  const updatedUser = await User.findByIdAndUpdate(_id, body, { new: true });
  if (!updatedUser) throw HttpError(404, "User not found");

  const sendUserData = userField(updatedUser);

  res.status(200).json({
    status: "OK",
    code: 200,
    user: sendUserData,
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUser: ctrlWrapper(updateUser),
};
