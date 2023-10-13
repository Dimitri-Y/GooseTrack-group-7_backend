import express from "express";
const reviewsRouter = express.Router();
import { addSchema, changeSchema } from "../../models/schemas/review.js";
import validateBody from "../../decorators/validateBody.js";
import ctrl from "../../controllers/reviews-controller.js";

reviewsRouter.get("/", ctrl.getAllReviews);

reviewsRouter.get("/own", ctrl.getOwnReview);

reviewsRouter.post("/own", validateBody(addSchema), ctrl.addReview);

reviewsRouter.patch("/own", validateBody(changeSchema), ctrl.updateReview);

reviewsRouter.delete("/own", ctrl.deleteReview);

export default reviewsRouter;
