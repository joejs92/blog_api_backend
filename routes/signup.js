const {Router} = require("express");
const { LocalStorage } = require('node-localstorage');
const controller = require("../controllers/controller");
const jwt = require('jsonwebtoken');

const localStorage = new LocalStorage('../localData');

const signup = Router();

async function addHeader(req, res, next){
    const value = localStorage.getItem('jwtToken');
    req.headers = {'Authorization': `Bearer ${value}`};
    next(); 
}

signup.get("/", (req, res)=> res.render("signup"));
signup.get("/contributor", addHeader, controller.verifyToken, (req, res)=> {
    jwt.verify(req.token, 'secretkey', (err, authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                authData
            })
        }
    })
});

signup.post("/", controller.signup);

//signup.patch("/:userId") Form submission for signing up to be a contributor.
module.exports = signup;