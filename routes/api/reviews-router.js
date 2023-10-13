const express = require('express');
const reviewsRouter = express.Router();
const ctrl = require("../../controllers/reviews-controller");
import { addSchema, changeSchema} from "../../models/schemas/review";
reviewsRouter.get("/", ctrl.getAllReviews);

reviewsRouter.get("/own", ctrl.getOwnReview );

reviewsRouter.post("/own", addSchema, ctrl.addReview);

reviewsRouter.patch("/own", changeSchema, ctrl.updateReview);

reviewsRouter.delete("/own", ctrl.deleteReview);
module.exports = reviewsRouter;