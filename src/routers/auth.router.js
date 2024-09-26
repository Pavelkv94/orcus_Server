import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { body, check } from "express-validator";
import { inputCheckErrorsMiddleware } from "../middlewares/inputCheckErrorsMiddleware.js";

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

// router.post(
//   "/registration",
//   [
//     check("username", "Имя пользователя не может быть пустым").notEmpty(),
//     check("password", " Пароль должен быть больше 4 и меньше 10 символов").isLength({ min: 4, max: 10 }),
//   ],
//   controller.registration
// );
// router.post("/login", controller.login);
// router.get("/me/:user", authMiddleware, controller.me);
// // router.get("/users", authMiddleware,  controller.getUsers); //todo добавляем мидлварю чтоб только зареганый юзер мог сделать такой запрос
// router.get("/users", roleMiddleware(["admin", "user"]), controller.getUsers);
