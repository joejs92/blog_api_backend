const {Router} = require("express");
const controller = require("../controllers/controller");

const comment = Router();

comment.get("/", (req, res)=> res.send("Comment works."));
comment.get("/:postId", controller.getAllComments);
comment.get("/:commentId", controller.getUniqueComment);

comment.post("/", controller.createComment);

comment.patch("/:commentId", controller.updateComment);

comment.delete("/:commentId", controller.deleteComment);

module.exports = comment;