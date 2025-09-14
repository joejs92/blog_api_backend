const {Router} = require("express");
const { LocalStorage } = require('node-localstorage');

const localStorage = new LocalStorage('../localData');

const logout = Router();

logout.get("/", (req, res)=>{
    localStorage.removeItem("jwtToken");
    res.send("Logout Successful");
});
/* Probably not a good way to do it, but it works. */

module.exports = logout;