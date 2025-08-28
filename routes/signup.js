const {Router} = require("express");
const controller = require("../controllers/controller");

const signup = Router();

async function addHeader(req, res, next){
    console.log(localStorage.getItem('jwtToken'))
    /* const token = localStorage.getItem('jwtToken');
    req.header = {'Authorization': `Bearer ${token}`};
    next(); */
    //NO LOCALSTORAGE BECAUSE IT IS Node!
}

signup.get("/", (req, res)=> res.render("signup"));
//signup.get("/contributor",controller.verifyToken ,(req, res)=> res.render("contributor"));
signup.get("/contributor", addHeader,controller.verifyToken ,(req, res)=> {
    JsonWebTokenError.verify(req.token, 'secretkey', (err, authData)=>{
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