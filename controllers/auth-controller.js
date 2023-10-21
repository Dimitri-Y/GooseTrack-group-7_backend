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
const avatarsDir = path.resolve("public", "avatar");

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
  const { email, phone, skype, birthday, userName, avatarURL } = req.user;

  res.json({
    email,
    phone,
    skype,
    birthday,
    userName,
    avatarURL,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({ message: "No content" });
};

const updateUser = async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Missing header with authorization token" });
  }

  const { _id } = req.user;

  const { userName, phone, birthday, skype, email } = req.body;

  const updateData = {
    userName,
    phone,
    birthday,
    skype,
    email,
  };

  let avatarURL;
  if (req.file) {
    // const { path: oldPath, originalname } = req.file;
    // const filename = `${_id}_${originalname}`;
    // const resultUpload = path.join(avatarsDir, filename);
    // await fs.rename(oldPath, resultUpload);

    // const resizeFile = await Jimp.read(resultUpload);
    // await resizeFile.resize(250, 250).write(resultUpload);

    // avatarURL = `${BASE_URL_BACK}/avatar/${filename}`;
    const { path: oldPath, filename } = req.file;
    const newAvatar = await Jimp.read(oldPath);
    await newAvatar.resize(250, 250);

    const newPath = path.join(avatarsDir, filename);
    await newAvatar.writeAsync(newPath);
    await fs.unlink(oldPath);
    const avatar = path.join("avatar", filename);
    updateData.avatarURL = avatar;
  }

  const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log(req.body);
  console.log(req.file);

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
