import { Router } from "express";
import { postsController } from "../controllers/posts.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { rolesMiddleware } from "../middlewares/role.middleware.js";

export const postsRouter = Router();

postsRouter.get("/", authMiddleware, rolesMiddleware(["User", "Admin"]), postsController.getPosts);
postsRouter.get("/short", authMiddleware, rolesMiddleware(["User", "Admin"]), postsController.getShortPosts); //before another :id for avoid bugs

postsRouter.get("/:id", authMiddleware, rolesMiddleware(["User", "Admin"]), postsController.getPost);
postsRouter.post("/", authMiddleware, rolesMiddleware(["Admin"]), postsController.createPost);
postsRouter.put("/:id", authMiddleware, rolesMiddleware(["Admin"]), postsController.updatePost);
postsRouter.delete("/:id", authMiddleware, rolesMiddleware(["Admin"]), postsController.deletePost);
