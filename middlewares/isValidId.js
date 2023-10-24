import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/httpError.js";

export const isValidId = (req, res, next) => {
  const { taskId } = req.params;
  if (!isValidObjectId(taskId)) {
    next(HttpError(404, `${taskId} is not valid id`));
  }
  next();
};
export const isValidIdDate = (req, res, next) => {
  const { date } = req.params;
  if (!isValidObjectId(date)) {
    next(HttpError(404, `${date} is not valid id`));
  }
  next();
};
export const isValidIdVerificationCode = (req, res, next) => {
  const { verificationCode } = req.params;
  if (!isValidObjectId(verificationCode)) {
    next(HttpError(404, `${verificationCode} is not valid id`));
  }
  next();
};
