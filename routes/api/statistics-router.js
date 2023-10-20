import express from "express";
const statRouter = express.Router();
import ctrl from "../../controllers/statistics-controller.js";

statRouter.get("/", ctrl.getAllTasks);
statRouter.get("/date", ctrl.getDayTasks);

export default statRouter;
