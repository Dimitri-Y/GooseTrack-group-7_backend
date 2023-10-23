import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/httpError.js";
import Task from "../models/schemas/task.js";

const getAllTasks = async (req, res, next) => {
  const { _id: owner } = req.user;

  const { filteredFrom, filteredTo } = req.query;

  const filters = {
    owner,
    date: {
      $gte: filteredFrom,
      $lte: filteredTo,
    },
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
      start: filteredFrom,
    },
  });
};

const getTasksByDate = async (req, res) => {
  const { _id: owner } = req.user;
  const { period, date } = req.params;
  let startDate, endDate;
  if (period === "day") {
    startDate = new Date(date);
    startDate.setHours(0, 0, 0);
    endDate = new Date(date);
    endDate.setHours(23, 59, 59);
  } else if (period === "month") {
    startDate = new Date(date);
    startDate.setDate(1);
    endDate = new Date(date);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);
  } else {
    throw HttpError(400);
  }
  const result = await Task.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
    owner,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};
//прошу перевірки оцього ось
export default {
  getAllTasks: ctrlWrapper(getAllTasks),
  getDayTasks: ctrlWrapper(getTasksByDate),
};
