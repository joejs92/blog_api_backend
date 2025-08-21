const express = require("express");
const app = express();
const index = require("./routes/index");
const comment = require("./routes/comment");
const login = require("./routes/login");
const logout = require("./routes/logout");
const posts = require("./routes/posts");
const signup = require("./routes/signup");

app.use(express.urlencoded({ extended: true }));

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