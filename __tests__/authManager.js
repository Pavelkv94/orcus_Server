import { req } from "./test-helpers";

export const authManager = {
  async registration(newUser) {
    const res = await req.post("/auth/registration").send(newUser);
    return res;
  },
  async login(user) {
    const res = await req.post("/auth/login").send(user);

    return res;
  },
};
