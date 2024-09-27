import cors from "cors";
import express from "express";
import { categoriesRouter } from "./routers/categories.router.js"; // Ensure to include the file extension
import { runDB } from "./db.js"; // Ensure to include the file extension
import dotenv from "dotenv";
import { postsRouter } from "./routers/posts.router.js";
import { authRouter } from "./routers/auth.router.js";
import "dotenv/config";

const url = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";

export const app = express();

dotenv.config();

runDB(url);

app.use(cors({ origin: "*" })); //!------CORS DANGER

app.use(express.json());

app.use("/auth", authRouter);
app.use("/categories", categoriesRouter);
app.use("/posts", postsRouter);
