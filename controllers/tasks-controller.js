import HttpError from '../helpers/httpError.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import Task from '../models/task.js';
import taskEndValidate from '../helpers/taskEndValidate.js';

const getAll = async (req, res) => {
  const result = await Task.find();
  console.log(result || 'no result');
  res.json(result);
};

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const { tasktId } = req.params;
  const result = await Task.findOne({ _id: tasktId, owner });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const add = async (req, res) => {
  // const { _id: owner } = req.user;
  const { start, end } = req.body;
  taskEndValidate(start, end);
  const result = await Task.create({ ...req.body });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { _id: owner } = req.user;
  const { tasktId } = req.params;
  const { start, end } = req.body;
  taskEndValidate(start, end);
  const result = await Task.findOneAndUpdate(
    { _id: tasktId, owner },
    req.body,
    {
      new: true,
    }
  );
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { _id: owner } = req.user;
  const { tasktId } = req.params;
  const result = await Task.findOneAndDelete({ _id: tasktId, owner });
  if (!result) {
    throw HttpError(404);
  }
  res.status(204).send();
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
