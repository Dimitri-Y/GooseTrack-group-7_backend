import express from "express";
const authRouter = express.Router();
// import { addSchema, logSchema } from "../../models/schemas/schema.js";
import { registerSchema, authSchema, updateSchema } from "../../models/schemas/user.js";
import authController from "../../controllers/auth-controller.js";
import authenticate from "../../middlewares/authenticate.js";
import upload from "../../middlewares/uploud.js";
import resizeAvatar from "../../middlewares/resizeAvatar.js";
import validateBody from "../../decorators/validateBody.js";

authRouter.post(
  "/auth/register",
  validateBody(registerSchema),
  authController.signup
);
authRouter.post("/auth/login", validateBody(authSchema), authController.signin);

authRouter.get("/users/current", authenticate, authController.getCurrent);
authRouter.post("/auth/logout", authenticate, authController.logout);
authRouter.patch(
  "/users/edit",
  upload.single("avatarURL"),
  authenticate,
  validateBody(updateSchema),
  authController.updateUser
);
export default authRouter;
