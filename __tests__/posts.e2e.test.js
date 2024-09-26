import { MongoMemoryServer } from "mongodb-memory-server";
import { clearPosts, runDB } from "../src/db";
import { req } from "./test-helpers";

describe("API Posts", () => {
  let client;
  beforeAll(async () => {
    // запуск виртуального сервера с временной бд
    client = await MongoMemoryServer.create();

    const uri = client.getUri();

    await runDB(uri);
  });

  beforeEach(async () => {
    await clearPosts();
  });

  afterAll(async () => {
    await client.stop();
  });

  it("return empty list", async () => {
    const response = await req.get("/posts").expect(200);

    expect(response.body.length).toBe(0);
  });

  it("should create post and get not empty array", async () => {
    const newPost = {
      title: "Title",
      category: "ssss",
      text: "ssdasdasd",
    };

    const response = await req.post("/posts").send(newPost).expect(201);

    expect(response.body.title).toBe(newPost.title);
    expect(response.body.category).toBe(newPost.category);
    expect(response.body.text).toBe(newPost.text);

    const getResponse = await req.get("/posts").expect(200);

    expect(getResponse.body.length).toBe(1);
  });

  it("should update post", async () => {
    const newPost = {
      title: "Title",
      category: "ssss",
      text: "ssdasdasd",
    };

    const createResponse = await req.post("/posts").send(newPost).expect(201);

    const updatedPost = {
      title: "Title2",
      category: "qweqwe2",
      text: "qweqew2",
    };
    const updateResponse = await req.put(`/posts/${createResponse.body.id}`).send(updatedPost).expect(200);

    expect(updateResponse.body.title).toBe(updatedPost.title);
    expect(updateResponse.body.category).toBe(updatedPost.category);
    expect(updateResponse.body.text).toBe(updatedPost.text);

    const getResponse = await req.get("/posts").expect(200);

    expect(getResponse.body.length).toBe(1);
  });

  it("should delete post", async () => {
    const newPost = {
      title: "Title",
      category: "ssss",
      text: "ssdasdasd",
    };

    const createResponse = await req.post("/posts").send(newPost).expect(201);

    const deleteResponse = await req.delete(`/posts/${createResponse.body.id}`).expect(204);

    const getResponse = await req.get("/posts").expect(200);

    expect(getResponse.body.length).toBe(0);
  });
});
