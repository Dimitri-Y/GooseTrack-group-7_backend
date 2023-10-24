import express from "express";
const authRouter = express.Router();
import {
  registerSchema,
  authSchema,
  updateSchema,
  emailSchema,
} from "../../models/schemas/user.js";
import authController from "../../controllers/auth-controller.js";
import authenticate from "../../middlewares/authenticate.js";
import upload from "../../middlewares/uploud.js";
import validateBody from "../../decorators/validateBody.js";

authRouter.post(
  "/auth/register",
  validateBody(registerSchema),
  authController.signup
);
authRouter.post("/auth/login", validateBody(authSchema), authController.signin);
authRouter.get("/users/verify/:verificationCode", authController.verify);
authRouter.post(
  "/users/verify",
  validateBody(emailSchema),

  authController.resendVerifyEmail
);

authRouter.get("/users/current", authenticate, authController.getCurrent);
authRouter.post("/auth/logout", authenticate, authController.logout);
authRouter.patch(
  "/users/edit",
  authenticate,
  upload.single("avatarURL"),
  validateBody(updateSchema),
  authController.updateUser
);
export default authRouter;
