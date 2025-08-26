const {Router} = require("express");
const controller = require("../controllers/controller");

const index = Router();

index.get("/", (req, res)=> res.send("Index works."));
index.get("/getAllUsers", controller.getAllUsers);

module.exports = index;