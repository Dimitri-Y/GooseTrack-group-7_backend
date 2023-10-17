import express from 'express';
import taskController from '../../controllers/tasks-controller.js';
import {
  authenticate,
  taskValidate,
  isValidId,
} from '../../middlewares/index.js';

const tasksRouter = express.Router();
// tasksRouter.use(authenticate);

tasksRouter.get('/', taskController.getAll);

tasksRouter.post('/', taskController.add);

tasksRouter.patch(
  '/:Id',
  isValidId,
  taskValidate.patchTaskValidate,
  taskController.updateById
);
tasksRouter.delete('/:Id', isValidId, taskController.deleteById);

export default tasksRouter;
