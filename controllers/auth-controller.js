import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import { User } from "../models/schemas/user.js";
import { nanoid } from "nanoid";
const { JWT_SECRET, BASE_URL } = process.env;
import { HttpError } from "../helpers/httpError.js";

import gravatar from "gravatar";
const avatarsPath = path.resolve("public", "avatar");
const signup = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationCode = nanoid();
  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
    verificationCode,
  });
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click to verify email</a>`,
  };
  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
  });
};
const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw HttpError(404, "User not found");
  }

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

export default {
  signup,
  signin,
  getCurrent,
  logout,
  updateUser,
};
