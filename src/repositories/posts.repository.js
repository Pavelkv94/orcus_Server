import { ObjectId } from "mongodb";
import { postsCollection } from "../db.js";

export const postsRepository = {
  async find(id) {
    const findID = new ObjectId(id);

    const category = postsCollection.findOne({ _id: findID });

    return category || null;
  },
  async findAll() {
    const categories = await postsCollection.find({}).toArray();
    return categories;
  },
  async create(payload) {
    const { title, category, text } = payload;

    const id = new ObjectId();

    let newPost = {
      title,
      category,
      text,
      id: id.toString(),
      _id: id,
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
      { id: id },
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
    const result = await postsCollection.deleteOne({ id: id });
    return result.deletedCount > 0;
  },
};
