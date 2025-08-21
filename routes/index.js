const {Router} = require("express");

const index = Router();

index.get("/", (req, res)=> res.send("Index works."));

module.exports = index;