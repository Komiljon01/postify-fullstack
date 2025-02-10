const BaseError = require("../errors/base.error");
const postModel = require("../models/post.model");

module.exports = async function (req, res, next) {
  try {
    const post = await postModel.findById(req.params.id);
    const authorID = req.user.id;

    if (post.author.toString() !== authorID) {
      return next(BaseError.BadRequest("Only author can edit this post!"));
    }
    next();
  } catch (error) {
    return next(BaseError.BadRequest("Only author can edit this post!"));
  }
};
