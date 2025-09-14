const path = require("node:path");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy; //move to controller
const index = require("./routes/index");
const comment = require("./routes/comment");
const login = require("./routes/login");
const logout = require("./routes/logout");
const posts = require("./routes/posts");
const signup = require("./routes/signup");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.json());

app.use("/", index);
app.use("/comment", comment);
app.use("/login", login);
app.use("/logout", logout);
app.use("/posts", posts);
app.use("/signup", signup);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`It's working - listening on port ${PORT}!`);
});