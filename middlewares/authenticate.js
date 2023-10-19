import jwt from "jsonwebtoken";
import HttpError from "../helpers/httpError.js";
import User from "../models/Users.js";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    throw HttpError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw HttpError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    throw HttpError(401, "Not authorized");
  }
};
export default authenticate;



