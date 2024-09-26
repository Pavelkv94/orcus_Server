import { agent } from "supertest";
import { app } from "../src/app";

export const req = agent(app);

