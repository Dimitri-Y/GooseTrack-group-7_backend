import express from "express";
const reviewsRouter = express.Router();
import { addSchema, changeSchema } from "../../models/schemas/review.js";
import validateBody from "../../decorators/validateBody.js";
import ctrl from "../../controllers/reviews-controller.js";
import authenticate from "../../middlewares/authenticate.js";

reviewsRouter.get("/", ctrl.getAllReviews);

reviewsRouter.get("/own", authenticate, ctrl.getOwnReview);

reviewsRouter.post(
  "/own",
  authenticate,
  validateBody(addSchema),
  ctrl.addReview
);

reviewsRouter.patch(
  "/own",
  authenticate,
  validateBody(changeSchema),
  ctrl.updateReview
);

reviewsRouter.delete("/own", authenticate, ctrl.deleteReview);

export default reviewsRouter;
