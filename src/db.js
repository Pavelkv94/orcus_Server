import { MongoClient } from "mongodb";

export let db;
export let categoriesCollection;
export let postsCollection;
export let usersCollection;

export const runDB = async (url) => {
  const client = new MongoClient(url);

  db = client.db(process.env.DB_NAME);

  categoriesCollection = db.collection("categories");
  postsCollection = db.collection("posts");
  usersCollection = db.collection("users");

  try {
    console.log("connected to MongoDB");
    await client.connect();
    return true;
  } catch (e) {
    console.log(e);
    await client.close();
    return false;
  }
};

export const clearCategories = async () => {
  await categoriesCollection.drop();
};

export const clearPosts = async () => {
  await postsCollection.drop();
};
