import { MongoMemoryServer } from "mongodb-memory-server";
import { clearAuth, clearPosts, runDB } from "../src/db";
import { req } from "./test-helpers";
import { authManager } from "./authManager";

describe("API Posts", () => {
  let client;
  beforeAll(async () => {
    // запуск виртуального сервера с временной бд
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
    await clearPosts();
  });

  afterAll(async () => {
    await clearPosts();
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
      .get("/posts")
      .set({ Authorization: "Bearer " + token })
      .expect(200);

    expect(response.body.length).toBe(0);
  });

  it("should create post and get not empty array", async () => {
    const user = {
      username: "test",
      password: "password",
    };

    const res = await authManager.login(user);
    const token = res.body.token;

    const newPost = {
      title: "Title",
      category: "ssss",
      text: "ssdasdasd",
    };

    const response = await req
      .post("/posts")
      .set({ Authorization: "Bearer " + token })
      .send(newPost)
      .expect(201);

    expect(response.body.title).toBe(newPost.title);
    expect(response.body.category).toBe(newPost.category);
    expect(response.body.text).toBe(newPost.text);

    const getResponse = await req
      .get("/posts")
      .set({ Authorization: "Bearer " + token })
      .expect(200);

    expect(getResponse.body.length).toBe(1);
  });

  it("should find post", async () => {
    const user = {
      username: "test",
      password: "password",
    };

    const res = await authManager.login(user);
    const token = res.body.token;

    const newPost = {
      title: "Title",
      category: "ssss",
      text: "ssdasdasd",
    };

    const response = await req
      .post("/posts")
      .set({ Authorization: "Bearer " + token })
      .send(newPost)
      .expect(201);

    const findResponse = await req
      .get(`/posts/${response.body._id}`)
      .set({ Authorization: "Bearer " + token })
      .expect(200);
  });

  it("should update post", async () => {
    const user = {
      username: "test",
      password: "password",
    };

    const res = await authManager.login(user);
    const token = res.body.token;

    const newPost = {
      title: "Title",
      category: "ssss",
      text: "ssdasdasd",
    };

    const createResponse = await req
      .post("/posts")
      .set({ Authorization: "Bearer " + token })
      .send(newPost)
      .expect(201);

    const updatedPost = {
      title: "Title2",
      category: "qweqwe2",
      text: "qweqew2",
    };
    const updateResponse = await req
      .put(`/posts/${createResponse.body.id}`)
      .set({ Authorization: "Bearer " + token })
      .send(updatedPost)
      .expect(200);

    expect(updateResponse.body.title).toBe(updatedPost.title);
    expect(updateResponse.body.category).toBe(updatedPost.category);
    expect(updateResponse.body.text).toBe(updatedPost.text);

    const getResponse = await req
      .get("/posts")
      .set({ Authorization: "Bearer " + token })
      .expect(200);

    expect(getResponse.body.length).toBe(1);
  });

  it("should delete post", async () => {
    const user = {
      username: "test",
      password: "password",
    };

    const res = await authManager.login(user);
    const token = res.body.token;

    const newPost = {
      title: "Title",
      category: "ssss",
      text: "ssdasdasd",
    };

    const createResponse = await req
      .post("/posts")
      .set({ Authorization: "Bearer " + token })
      .send(newPost)
      .expect(201);

    const deleteResponse = await req
      .delete(`/posts/${createResponse.body.id}`)
      .set({ Authorization: "Bearer " + token })
      .expect(204);

    const getResponse = await req
      .get("/posts")
      .set({ Authorization: "Bearer " + token })
      .expect(200);

    expect(getResponse.body.length).toBe(0);
  });

  it("shouldn't delete post", async () => {
    const user = {
      username: "test",
      password: "password",
    };

    const res = await authManager.login(user);
    const token = res.body.token;

    const deleteResponse = await req
      .delete(`/posts/1`)
      .set({ Authorization: "Bearer " + token })
      .expect(404);

    const getResponse = await req
      .get("/posts")
      .set({ Authorization: "Bearer " + token })
      .expect(200);

    expect(getResponse.body.length).toBe(0);
  });

  it("should get short post", async () => {
    const user = {
      username: "test",
      password: "password",
    };

    const res = await authManager.login(user);
    const token = res.body.token;

    const newPost = {
      title: "Title",
      category: "ssss",
      text: "ssdasdasd",
    };

    const response = await req
      .post("/posts")
      .set({ Authorization: "Bearer " + token })
      .send(newPost)
      .expect(201);

    const getResponse = await req
      .get("/posts/short")
      .set({ Authorization: "Bearer " + token })
      .expect(200);

    expect(getResponse.body.length).toBe(1);
  });
});
