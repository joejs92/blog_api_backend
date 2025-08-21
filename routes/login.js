const {Router} = require("express");

const login = Router();

login.get("/", (req, res)=> res.send("Login works."));

module.exports = login;