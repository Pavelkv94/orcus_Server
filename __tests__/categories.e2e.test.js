import { MongoMemoryServer } from "mongodb-memory-server";
import { clearCategories, runDB } from "../src/db";
import { req } from "./test-helpers";

describe("API Categories", () => {
  let client;
  beforeAll(async () => {
    // запуск виртуального сервера с временной бд
    client = await MongoMemoryServer.create();

    const uri = client.getUri();

    await runDB(uri);
  });

  beforeEach(async () => {
    await clearCategories();
  });

  afterAll(async () => {
    await client.stop();
  });

  it("return empty list", async () => {
    const response = await req.get("/categories").expect(200);

    expect(response.body.length).toBe(0);
  });

  it("should create category and get not empty array", async () => {
    const category = {
      title: "asdasd",
    };

    const response = await req.post("/categories").send(category).expect(201);

    expect(response.body.title).toBe(category.title);

    const getResponse = await req.get("/categories").expect(200);

    expect(getResponse.body.length).toBe(1);
  });


});
