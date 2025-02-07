const postService = require("../service/post.service");

class PostController {
  async getAll(req, res) {
    try {
      const allPosts = await postService.getAll();
      res.status(200).json(allPosts);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async create(req, res) {
    try {
      const newPost = await postService.create(req.body, req.files.picture);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async delete(req, res) {
    try {
      const post = await postService.delete(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async edit(req, res) {
    try {
      const { body, params } = req;
      const post = await postService.edit(body, params.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getOne(req, res) {
    try {
      const allPosts = await postService.getOne(req.params.id);
      res.status(200).json(allPosts);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new PostController();
