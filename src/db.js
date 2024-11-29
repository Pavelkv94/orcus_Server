import { MongoClient } from "mongodb";

export let db;
export let categoriesCollection;
export let postsCollection;
export let usersCollection;
export let rolesCollection;

export const runDB = async (url) => {
  const client = new MongoClient(url);

  db = client.db(process.env.DB_NAME);

  try {
    console.log("Attempting to connect to MongoDB...");
    console.log(`MongoDB URL: ${url}`);
    console.log(`Database Name: ${process.env.DB_NAME}`);
    await client.connect(); // Add this log to ensure the connection step completes
    console.log("MongoDB Connected");

    categoriesCollection = db.collection("categories");
    postsCollection = db.collection("posts");
    usersCollection = db.collection("users");
    rolesCollection = db.collection("roles");
    console.log("Collections initialized");

    return true;
  } catch (e) {
    console.error("Error during MongoDB connection:", e.message);
    console.error("Stack Trace:", e.stack);
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
