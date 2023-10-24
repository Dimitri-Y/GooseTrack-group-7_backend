import express from "express";
const statRouter = express.Router();
import ctrl from "../../controllers/statistics-controller.js";
import authenticate from "../../middlewares/authenticate.js";
import { isValidIdDate } from "../../middlewares/isValidId.js";

statRouter.get("/", authenticate, ctrl.getAllTasks);
statRouter.get("/:date", authenticate, isValidIdDate, ctrl.getDayTasks);

export default statRouter;
