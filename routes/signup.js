const {Router} = require("express");
const controller = require("../controllers/controller");

const signup = Router();

signup.get("/", (req, res)=> res.render("signup"));
//signup.post("/user", controller.signup);
signup.post("/", (req, res)=>{
    const request = req.body;
    //res.json(request);
    console.log(request);
});
//It seems that postman is not sending the body for the request.
module.exports = signup;