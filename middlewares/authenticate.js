import jwt from "jsonwebtoken";
import HttpError from "../helpers/httpError.js";
import { User } from "../models/schemas/user.js";

import dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      next(HttpError(401));
    }
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};
export default authenticate;
