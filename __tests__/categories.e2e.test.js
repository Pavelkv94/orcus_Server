import { MongoMemoryServer } from "mongodb-memory-server";
import { clearAuth, clearCategories, runDB } from "../src/db";
import { req } from "./test-helpers";
import { authManager } from "./authManager";

describe("API Categories", () => {
  let client;
  beforeAll(async () => {
    client = await MongoMemoryServer.create();

    const uri = client.getUri();

    await runDB(uri);

    const newUser = {
      username: "test",
      password: "password",
    };

    await authManager.registration(newUser);
  });

  beforeEach(async () => {
    await clearCategories();
  });

  afterAll(async () => {
    await clearCategories();
    await clearAuth();
    await client.stop();
  });

  it("return empty list", async () => {
    const user = {
      username: "test",
      password: "password",
    };

    const res = await authManager.login(user);
    const token = res.body.token;

    const response = await req
      .get("/categories")
      .set({ Authorization: "Bearer " + token })
      .expect(200);

    expect(response.body.length).toBe(0);
  });

  it("should create category and get not empty array", async () => {
    const user = {
      username: "test",
      password: "password",
    };

    const res = await authManager.login(user);
    const token = res.body.token;

    const category = {
      title: "asdasd",
    };

    const response = await req
      .post("/categories")
      .set({ Authorization: "Bearer " + token })
      .send(category)
      .expect(201);

    expect(response.body.title).toBe(category.title);

    const getResponse = await req
      .get("/categories")
      .set({ Authorization: "Bearer " + token })
      .expect(200);

    expect(getResponse.body.length).toBe(1);
  });
});
