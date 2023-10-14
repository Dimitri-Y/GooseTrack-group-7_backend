import express from "express";
const authRouter = express.Router();
import { addSchema, logSchema } from "../../models/schemas/schema.js";
import authController from "../../controllers/auth-controller.js"




authRouter.post("/auth/register", addSchema, isValidid, authController.signup);
authRouter.post("/auth/login", logSchema, isValidid, authController.signin);

authRouter.get( "/users/current", authController.getCurrent);
authRouter.post("/auth/logout",  authController.logout);
authRouter.patch("/users/edit",  authController.updateUser);