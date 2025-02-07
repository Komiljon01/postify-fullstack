const express = require("express");
const PostController = require("../controllers/post.controller");
const router = express.Router();

router.get("/get", PostController.getAll);
router.post("/create", PostController.create);
router.delete("/delete/:id", PostController.delete);
router.put("/edit/:id", PostController.edit);
router.get("/get-one/:id", PostController.getOne);

module.exports = router;
