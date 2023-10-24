import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/httpError.js";
import Task from "../models/schemas/task.js";

const getAllTasks = async (req, res, next) => {
  const { _id: owner } = req.user;

  const filters = {
    owner
  };
  const tasksList = await Task.find(filters).populate(
    "owner",
    "_id name email"
  );

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: tasksList,
    },
  });
};

const getTasksByDate = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.params;
  const pattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!date || !pattern.test(date)) throw HttpError(400);

  const [year, month] = date.split('-');


  if (!month) throw HttpError(400);
  const result = await Task.find({
    date: {
      $regex: `^\\d{4}-${month}-\\d{2}`,
    },
    owner,
  });

  if (!result) {
    throw HttpError(404);
  }

  const filteredTasks = result.filter(task => task.date.startsWith(date));

  res.status(200).json({ByMonth: result, ByDay: filteredTasks,});
};

export default {
  getAllTasks: ctrlWrapper(getAllTasks),
  getDayTasks: ctrlWrapper(getTasksByDate),
};
