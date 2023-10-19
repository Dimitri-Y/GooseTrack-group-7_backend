import express from 'express';
import taskController from '../../controllers/tasks-controller.js';
import {
  authenticate,
  taskValidate,
  isValidId,
} from '../../middlewares/index.js';

const tasksRouter = express.Router();
tasksRouter.use(authenticate);

tasksRouter.get('/', taskController.getAll);
tasksRouter.get('/:taskId', taskController.getById);

tasksRouter.post('/', taskValidate.addTaskValidate, taskController.add);

tasksRouter.put(
  '/:taskId',
  isValidId,
  taskValidate.patchTaskValidate,
  taskController.updateById
);
tasksRouter.delete('/:taskId', taskController.deleteById);

export default tasksRouter;
