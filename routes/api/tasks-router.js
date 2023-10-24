import express from "express";
import taskController from "../../controllers/tasks-controller.js";
import { authenticate, taskValidate } from "../../middlewares/index.js";
import { isValidId } from "../../middlewares/isValidId.js";

const tasksRouter = express.Router();
tasksRouter.use(authenticate);

tasksRouter.get("/", taskController.getAll);
tasksRouter.get("/:taskId", isValidId, taskController.getById);

tasksRouter.post("/", taskValidate.addTaskValidate, taskController.add);

tasksRouter.put(
  "/:taskId",
  isValidId,
  taskValidate.patchTaskValidate,
  taskController.updateById
);
tasksRouter.delete("/:taskId", isValidId, taskController.deleteById);

export default tasksRouter;
