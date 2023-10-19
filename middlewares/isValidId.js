import { isValidObjectId } from 'mongoose';
import HttpError from '../helpers/httpError.js';

const isValidId = (req, res, next) => {
  const { taskId } = req.params;
  if (!isValidObjectId(taskId)) {
    next(HttpError(404, `${taskId} is not valid id`));
  }
  next();
};

export default isValidId;
