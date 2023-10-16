import express from "express";
const authRouter = express.Router();
import { addSchema, logSchema } from "../../models/schemas/schema.js";
import authController from "../../controllers/auth-controller.js";
import authenticate from "../../middlewares/authenticate.js";
import upload from "../../middlewares/uploud.js";
import resizeAvatar from "../../middlewares/resizeAvatar.js";
import validateBody from "../../decorators/validateBody.js";

authRouter.post(
  "/auth/register",
  validateBody(addSchema),
  isValidid,
  authController.signup
);
authRouter.post(
  "/auth/login",
  validateBody(logSchema),
  isValidid,
  authController.signin
);

authRouter.get("/users/current", authenticate, authController.getCurrent);
authRouter.post("/auth/logout", authenticate, authController.logout);
authRouter.patch(
  "/users/edit",
  authenticate,
  upload.single("avatars"),
  resizeAvatar,
  authController.updateUser
);
export default authRouter;
