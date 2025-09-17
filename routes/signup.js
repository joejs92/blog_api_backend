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

async function contributorVerification(req, res, next){
    //The password assigned by you for verification. (??)
    const yourPassword = "gooblies";
    const password = req.body.password;
    if(password == yourPassword){
        next();
    }
    else{
        res.send("Incorrect password, dummy.");
    }
}

async function updateStatus(userId){
    await controller.contributorSignup(userId);
}

signup.get("/", (req, res)=> res.send("Signup Works"));
signup.get("/contributor", addHeader, controller.verifyToken, (req, res)=> {
    jwt.verify(req.token, 'secretkey', (err, authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
           res.send("Successfully accessed Contributor Signup");
        }
    })
}); // <- just renders the contributor signup page.

signup.post("/", controller.signup);
signup.post("/enroll", addHeader, controller.verifyToken, contributorVerification,(req, res)=> {
    jwt.verify(req.token, 'secretkey', (err, authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            updateStatus(authData.newUser.id);
            res.send("Success!")
        }
    })
});

module.exports = signup;