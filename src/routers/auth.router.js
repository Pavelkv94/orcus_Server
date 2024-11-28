import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { inputCheckErrorsMiddleware } from "../middlewares/inputCheckErrorsMiddleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { rolesMiddleware } from "../middlewares/role.middleware.js";

export const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post(
    "/registration",
    [
        body("username").notEmpty().withMessage("Username shouldn't be empty").isLength({ min: 4, max: 15 }).withMessage("Username shouldn't be 4-15 symbols"),
        body("password").isLength({ min: 4, max: 10 }).withMessage("Password should be more than 4 and less 10 symbols"),
    ],
    inputCheckErrorsMiddleware,
    authController.registration
);
authRouter.post("/roles", authMiddleware, rolesMiddleware(["Admin"]), authController.addRole);
authRouter.get("/users", authMiddleware, rolesMiddleware(["Admin"]), authController.getUsers);
authRouter.get("/me/:username", authMiddleware, rolesMiddleware(["User", "Admin"]), authController.getUser);
