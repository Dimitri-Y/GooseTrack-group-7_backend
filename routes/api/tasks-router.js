import express from 'express';
import taskController from '../../controllers/tasks-controller.js';
// import authenticate from '../../middlewares/authenticate.js';
import taskValidate from '../../middlewares/task-validation.js';
import isValidId from '../../middlewares/isValidId.js';

const tasksRouter = express.Router();
// tasksRouter.use(authenticate);

tasksRouter.get('/', taskController.getAll);

tasksRouter.post('/', taskValidate.addTaskValidate, taskController.add);
tasksRouter.patch(
  '/:Id',
  isValidId,
  taskValidate.patchTaskValidate,
  taskController.updateById
);
tasksRouter.delete('/:Id', isValidId, taskController.deleteById);

export default tasksRouter;
