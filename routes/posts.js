const {Router} = require("express");
const controller = require("../controllers/controller");

const posts = Router();

posts.get("/", controller.getAllPosts);
posts.get("/:postId", controller.getPost);

posts.patch("/:postId", controller.updatePostPublish);
posts.patch("/edit/:postId", controller.updatePostContent);

posts.post("/", controller.createPost);

posts.delete("/:postId", controller.deletePost);

module.exports = posts;