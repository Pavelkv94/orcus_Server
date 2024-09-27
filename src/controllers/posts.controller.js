import { postsRepository } from "../repositories/posts.repository.js";

export const postsController = {
  async getPosts(req, res) {
    const posts = await postsRepository.findAll();

    res.status(200).send(posts);
  },
  async getShortPosts(req, res) {
    const posts = await postsRepository.findAllShort();

    res.status(200).send(posts);
  },
  async getPost(req, res) {
    const post = await postsRepository.find(req.params.id);

    res.status(200).send(post);
  },

  async createPost(req, res) {
    const postId = await postsRepository.create(req.body);
    const post = await postsRepository.find(postId);

    res.status(201).json(post);
  },
  async updatePost(req, res) {
    const postId = await postsRepository.update(req.params.id, req.body);

    const post = await postsRepository.find(postId);

    res.status(200).send(post);
  },
  async deletePost(req, res) {
    const isDeleted = await postsRepository.delete(req.params.id);

    if (!isDeleted) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  },
};
