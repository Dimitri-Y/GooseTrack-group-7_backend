import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/schemas/user.js";
import { nanoid } from "nanoid";
import HttpError from "../helpers/httpError.js";
import userField from "../helpers/userField.js";
import sendEmail from "../helpers/sendEmail.js";
import gravatar from "gravatar";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

import dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password, userName } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { protocol: 'https' });
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

  await sendEmail(verificationCode, email, userName);
  // const sendUserData = userField(newUser)

  res.status(201).json({
    email: newUser.email,
    verificationCode: newUser.verificationCode,
    phone: " ",
    skype: " ",
    birthday: " ",
    userName: newUser.userName,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const comparePassword = await bcrypt.compare(password, user.password);
  // if (!user) {
  //   throw HttpError(401, "Email or password is wrong");
  // }
  if (!user.verify) {
    throw HttpError(401, "This is not verificate");
  }

  if (!user || !comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }
  // const payload = { id: user._id }
  const { _id: id } = user;
  const payload = {
    id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token }, { new: true });

  res.status(200).json({
    token,
    user: {
      email: user.email,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, phone, skype, birthday, userName, avatarURL } = req.user;

  res.status(200).json({
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

  res.status(204).json({message: "No content"});
};

const updateUser = async (req, res) => {
  const { _id } = req.user;

  const { userName, phone, birthday, skype, email } = req.body;

  const updateData = {
    userName,
    phone,
    birthday,
    skype,
    email,
  };

  if (req.file) {
    const { path } = req.file;
    updateData.avatarURL = path;
  }

  const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  const sendUserData = userField(updatedUser);

  res.status(200).json({
    status: "OK",
    code: 200,
    user: sendUserData,
  });
};

const verify = async (req, res) => {
  const { verificationCode } = req.params;

  const user = await User.findOne({ verificationCode });
  if (!user) throw HttpError(404);
  if (user.verify) throw HttpError(400, "Email already verify")

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });
  res.status(200).sendFile(__dirname + "/GooseTrackVerify.html");
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(404, "Email not found");

  if (user.verify) throw HttpError(400, "Email already verify");
  if (user.verificationCode) {
    await sendEmail(user.verificationCode, email);
    res.status(200).json({
      status: "OK",
      code: 200,
      message: "Verify email resend success",
      email,
    });
  } else {
    const verificationCode = nanoid();
    const result = await User.findOneAndUpdate(
      { email: user.email },
      { verificationCode: verificationCode },
      {
        new: true,
      }
    );
    await sendEmail(verificationCode, email);
    res.status(200).json({
      status: "OK",
      code: 200,
      message: "create new verificationCode. Verify email resend success",
      email,
    });
  }
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUser: ctrlWrapper(updateUser),
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
