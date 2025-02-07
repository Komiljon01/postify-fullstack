const postModel = require("../models/post.model");
const fileService = require("./file.service");

class PostService {
  async getAll() {
    const allPosts = await postModel.find();
    return allPosts;
  }

  async create(post, picture) {
    const filePicture = fileService.save(picture);
    const newPost = await postModel.create({ ...post, picture: filePicture });
    return newPost;
  }

  async delete(id) {
    const post = await postModel.findByIdAndDelete(id);
    return post;
  }

  async edit(post, id) {
    if (!id) {
      throw new Error("Id is not found!");
    }

    const updatedData = await postModel.findByIdAndUpdate(id, post, {
      new: true,
    });
    return updatedData;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Id is not found!");
    }

    const detailPost = await postModel.findById(id);
    return detailPost;
  }
}

module.exports = new PostService();
