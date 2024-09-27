import { ObjectId } from "mongodb";
import { categoriesCollection } from "../db.js";

export const categoriesRepository = {
  async find(id) {
    const findID = new ObjectId(id);

    const category = categoriesCollection.findOne({ _id: findID });

    return category || null;
  },
  async findAll() {
    const categories = await categoriesCollection.find({}).toArray();

    return categories;
  },
  async create(payload) {
    const newCategory = {
      title: payload.title,
    };

    let categoryId;
    try {
      const category = await categoriesCollection.insertOne(newCategory);
      categoryId = category.insertedId.toString();
    } catch (error) {
      console.log(error);
    }

    return categoryId;
  },
};
