const {Router} = require("express");

const signup = Router();

signup.get("/", (req, res)=> res.send("Signup works."));

module.exports = signup;