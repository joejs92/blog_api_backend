const {Router} = require("express");
const controller = require("../controllers/controller");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const login = Router();

async function loginMiddleware(req, res){
    //could possibly use more authentication in here, but works as of now.
    const username = req.body.username;
    const password = req.body.password;
    if (typeof window !== 'undefined' && window.localStorage) {
        console.log("Yay!");
    }
    const user = await controller.getUserByUsername(username);
    if(!user){
        return res.send("No such user");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        // passwords do not match!
        return res.send("Incorrect password");
    }
    jwt.sign({user}, 'secretkey', (err, token)=>{
        const newToken = JSON.stringify(token);
        /* localStorage.setItem('jwtToken', newToken) */});
        //console.log(localStorage.getItem('jwtToken'))
        res.redirect('/signup');
}


login.get("/", (req, res)=> res.render("login"));

login.post("/", loginMiddleware);

/* 
Wait, why do I have to use the local strategy at all? All I need is bcrypt.
And you know what? It works.
*/

module.exports = login;