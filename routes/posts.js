const {Router} = require("express");

const posts = Router();

posts.get("/", (req, res)=> res.send("Posts works."));

module.exports = posts;