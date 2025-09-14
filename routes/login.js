const {Router} = require("express");
const { LocalStorage } = require('node-localstorage');
const controller = require("../controllers/controller");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const login = Router();

const localStorage = new LocalStorage('../localData');

async function loginMiddleware(req, res){
    //could possibly use more authentication in here, but works as of now.
    const username = req.body.username;
    const password = req.body.password;
    const user = await controller.getUserByUsername(username);
    if(!user){
        return res.send("No such user");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        // passwords do not match!
        return res.send("Incorrect password");
    }
    const newUser = {id: user.id, username: user.username};
    jwt.sign({newUser}, 'secretkey', (err, token)=>{
        //const newToken = JSON.stringify(token);
        localStorage.setItem('jwtToken', token)});
        res.send("Login Successful");
}


login.get("/", (req, res)=> res.send("Login Works"));

login.post("/", loginMiddleware);

/* 
Wait, why do I have to use the local strategy at all? All I need is bcrypt.
And you know what? It works.
*/

module.exports = login;