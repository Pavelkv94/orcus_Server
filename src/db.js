import { MongoClient } from "mongodb";

export let db;
export let categoriesCollection;
export let postsCollection;
export let usersCollection;
export let rolesCollection;

export const runDB = async (url) => {
  const client = new MongoClient(url);

  db = client.db(process.env.DB_NAME);

  categoriesCollection = db.collection("categories");
  postsCollection = db.collection("posts");
  usersCollection = db.collection("users");
  rolesCollection = db.collection("roles");

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

export const clearAuth = async () => {
  await usersCollection.drop();
  await rolesCollection.drop();
};
