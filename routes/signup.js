const {Router} = require("express");
const controller = require("../controllers/controller");

const signup = Router();

signup.get("/", (req, res)=> res.render("signup"));

signup.post("/", controller.signup);

signup.patch("/:userId") //for signing up to be a contributor.
module.exports = signup;