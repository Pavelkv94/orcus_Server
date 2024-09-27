import { Router } from "express";
import { categoriesController } from "../controllers/categories.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const categoriesRouter = Router();

categoriesRouter.get("/", authMiddleware, categoriesController.getCategories);
categoriesRouter.post("/", authMiddleware, categoriesController.createCategories);
