import { categoriesRepository } from "../repositories/categories.repository.js";

export const categoriesController = {
  async getCategories(req, res) {
    const categories = await categoriesRepository.findAll();

    res.status(200).send(categories);
  },
  async createCategories(req, res) {
    const { title } = req.body;
    const newCategory = {
      title: title,
    };

    const categoryId = await categoriesRepository.create(newCategory);
    const category = await categoriesRepository.find(categoryId);

    res.status(201).json(category);
  },
};
