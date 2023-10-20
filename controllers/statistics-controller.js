import ctrlWrapper from '../decorators/ctrlWrapper.js';
import Task from '../models/task.js';

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
    'owner',
    '_id name email'
  );

  res.status(200).json({
    status: 'success',
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
  const result = await Task.find({ date: date, owner });
  if (!result) {
    throw HttpError(404);

  }
  res.json(result);
};

export default {
    getAllTasks: ctrlWrapper(getAllTasks),
    getDayTasks: ctrlWrapper(getTasksByDate),
  };
  // const currentDate = new Date();
// const year = currentDate.getFullYear();
// const month = String(currentDate.getMonth() + 1).padStart(2, '0');
// const day = String(currentDate.getDate()).padStart(2, '0');
// const defaultDateString = `${year}-${month}-${day}`;
// export default defaultDateString;
  