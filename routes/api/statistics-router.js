import express from "express";
const statRouter = express.Router();
import ctrl from "../../controllers/statistics-controller";
statRouter.get('/', ctrl.getAllTasks);
statRouter.get('/date', ctrl.getTasksByDate);
export default statRouter;