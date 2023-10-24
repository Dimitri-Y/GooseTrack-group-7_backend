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
  const { date } = req.params;
  if (date) {
    let startDate, endDate;
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

export default {
  getAllTasks: ctrlWrapper(getAllTasks),
  getDayTasks: ctrlWrapper(getTasksByDate),
};
