const express = require("express");
const PostController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const authorMiddleware = require("../middlewares/author.middleware");
const router = express.Router();

router.get("/get", PostController.getAll);
router.post("/create", authMiddleware, PostController.create);
router.delete(
  "/delete/:id",
  authMiddleware,
  authorMiddleware,
  PostController.delete
);
router.put("/edit/:id", authMiddleware, authorMiddleware, PostController.edit);
router.get(
  "/get-one/:id",
  authMiddleware,
  authorMiddleware,
  PostController.getOne
);

module.exports = router;
