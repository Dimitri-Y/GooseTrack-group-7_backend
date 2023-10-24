import HttpError from "../helpers/httpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Task from "../models/schemas/task.js";

const getAll = async (req, res, next) => {
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

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const { taskId } = req.params;
  const result = await Task.findOne({ _id: taskId, owner });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Task.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { _id: owner } = req.user;
  const { taskId } = req.params;
  const result = await Task.findOneAndUpdate({ _id: taskId, owner }, req.body, {
    new: true,
  });
  res.status(200).json(result);
};

const deleteById = async (req, res) => {
  const { _id: owner } = req.user;
  const { taskId } = req.params;
  const result = await Task.findOneAndDelete({ _id: taskId, owner });
  if (!result) {
    throw HttpError(404, "Not found!");
  }
  res.status(200).json({ message: "Task has been removed"})
      // .send();
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
