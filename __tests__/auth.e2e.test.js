import { MongoMemoryServer } from "mongodb-memory-server";
import { clearAuth, runDB } from "../src/db";
import { req } from "./test-helpers";
import { authManager } from "./authManager";

describe("API Categories", () => {
  let client;
  beforeAll(async () => {
    // запуск виртуального сервера с временной бд
    client = await MongoMemoryServer.create();

    const uri = client.getUri();

    await runDB(uri);
  });

  afterAll(async () => {
    await clearAuth();
    await client.stop();
  });

  it("should registered new user", async () => {
    const newUser = {
      username: "test",
      password: "password",
    };

    const res = await authManager.registration(newUser);

    expect(res.body.message).toBe("User Registered!");
  });

  it("shouldn't registered new user", async () => {
    const newUser = {
      username: "test",
      password: "password",
    };

    const res = await authManager.registration(newUser);

    expect(res.status).toBe(400);
  });

  it("should login user", async () => {
    const user = {
      username: "test",
      password: "password",
    };

    const res = await authManager.login(user);

    expect(res.body.username).toBe(user.username);
  });

  it("shouldn't login user", async () => {
    const user = {
      username: "test2",
      password: "password",
    };

    const res = await authManager.login(user);

    expect(res.status).toBe(400);
  });
  it("incorrect password", async () => {
    const user = {
      username: "test",
      password: "password2",
    };

    const res = await authManager.login(user);

    expect(res.status).toBe(400);
  });

  it("should login user", async () => {
    const user = {
      username: "test",
      password: "password",
    };

    const res = await authManager.login(user);

    const token = res.body.token;

    const getUsersResponse = await req.get("/auth/users").set({ Authorization: "Bearer " + token });

    expect(getUsersResponse.body.length).toBe(1);
  });

  it("should add role", async () => {
    const user = {
      username: "test",
      password: "password",
    };
    const res = await authManager.login(user);

    const token = res.body.token;

    const createROleResponse = await req.post("/auth/roles?role=Member").set({ Authorization: "Bearer " + token });

    expect(createROleResponse.body.message).toBe("Role Registered!");
  });
  it("shouldn't add role", async () => {
    const user = {
      username: "test",
      password: "password",
    };
    const res = await authManager.login(user);

    const token = res.body.token;

    const createRoleResponse2 = await req.post("/auth/roles?role=Member").set({ Authorization: "Bearer " + token });

    expect(createRoleResponse2.status).toBe(400);
  });
});
