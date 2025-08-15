const {Router} = require("express");

const index = Router();

index.get("/", (req, res)=> res.send("Somehow works."));

module.exports = index;