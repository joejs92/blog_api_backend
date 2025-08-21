const {Router} = require("express");

const logout = Router();

logout.get("/", (req, res)=> res.send("Logout works."));

module.exports = logout;