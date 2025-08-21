const {Router} = require("express");

const comment = Router();

comment.get("/", (req, res)=> res.send("Comment works."));

module.exports = comment;