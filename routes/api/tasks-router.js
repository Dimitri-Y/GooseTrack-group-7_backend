import express from "express";
import taskController from "../../controllers/tasks-controller.js";
import authenticate from "../../middlewares/authenticate.js";
import taskValidate from "../../middlewares/task-validation.js";
import isValidId from "../../middlewares/isValidId.js";

const tasksRouter = express.Router();
tasksRouter.use(authenticate);

tasksRouter.get("/tasks", taskController.getAll);

// tasksRouter.post('/tasks', taskValidate.addContactValidate, taskController.add);

// tasksRouter.patch(
//   '/tasks/:Id',
//   isValidId,
//   taskValidate.patchContactValidate,
//   taskController.updateById
// );
tasksRouter.delete("/tasks/:Id", isValidId, taskController.deleteById);

export default tasksRouter;
