import { ObjectId } from "mongodb";
import { postsCollection } from "../db.js";

export const postsRepository = {
  async find(id) {
    const post = postsCollection.findOne({ _id: new ObjectId(id) });

    return post || null;
  },
  async findAll() {
    const posts = await postsCollection.find({}).toArray();
    return posts;
  },
  async findAllShort() {
    const posts = await postsCollection.find({}, { projection: { title: 1, _id: 1, category: 1 } }).toArray();

    return posts;
  },

  async create(payload) {
    const { title, category, text } = payload;

    let newPost = {
      title,
      category,
      text,
    };

    let postId;
    try {
      const post = await postsCollection.insertOne(newPost);
      postId = post.insertedId.toString();
    } catch (error) {
      console.log(error);
    }

    return postId;
  },
  async update(id, payload) {
    await postsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: payload.title,
          category: payload.category,
          text: payload.text,
        },
      }
    );

    return id;
  },
  async delete(id) {
    const result = await postsCollection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  },
};
